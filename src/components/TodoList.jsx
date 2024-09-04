import React, { useState, useEffect } from 'react';
import Todo from './Todo.jsx';
import Modal from './Modal';
import './Todo.css';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [isSorted, setIsSorted] = useState(false);

  // Get data from local storage 
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
     
      const processedTodos = savedTodos.map(todo => ({
        ...todo,
        isComplete: Number(todo.fulfillment) === 100,
      }));
      setTodos(processedTodos);
    }
  }, []);

 

  const addTodo = (todo) => {
    if (!todo.name || /^\s*$/.test(todo.name)) {
      return;
    }

    const newTodo = {
      ...todo,
      id: Date.now(), 
      isComplete: Number(todo.fulfillment) === 100,
    };

    console.log('New Todo:', newTodo);

    setTodos([newTodo, ...todos]);
    setModalOpen(false);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.name || /^\s*$/.test(newValue.name)) {
      return;
    }

    setTodos((prev) => {
      return prev.map((item) => {
        const updatedTodo = item.id === todoId
          ? { ...item, ...newValue, isComplete: Number(newValue.fulfillment) === 100 }
          : item;

        if (item.id === todoId) {
          console.log('Updated Todo:', updatedTodo);
        }

        return updatedTodo;
      });
    });
    setModalOpen(false);
  };

  const completeTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, isComplete: !todo.isComplete }
          : todo
      )
    );
  };

  const removeTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos)); // Update local storage
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    if (filter === 'Sort') {
      setIsSorted(!isSorted);
    }
  };

  const filteredTodos = todos
    .filter((todo) => {
      if (activeFilter === 'All') return true;
      if (activeFilter === 'Completed') {
        console.log('Completed Todos:', todo);
        return todo.isComplete === true;
      }
      if (activeFilter === 'To-Do') {
        console.log('To-Do Todos:', todo);
        return todo.isComplete === false;
      }
      return true;
    })
    .sort((a, b) => {
      if (isSorted) {
        return Number(b.fulfillment) - Number(a.fulfillment);
      }
      return 0;
    });

  const openEditModal = (todo) => {
    setCurrentTodo(todo);
    setModalOpen(true);
  };

  return (
    <div className='container'>
      <h1 className='head-todo'>React To-Do List</h1>
      <div className="buttons">
        <button
          className="add-todo-btn"
          onClick={() => {
            setCurrentTodo(null);
            setModalOpen(true);
          }}
        >
          Add a new to-do
        </button>
        <div>
          <div className="filter-buttons">
            <button onClick={() => handleFilterClick('Sort')}>Sort</button>
            <button
              className={activeFilter === 'All' ? 'active' : ''}
              onClick={() => handleFilterClick('All')}
            >
              All
            </button>
            <button
              className={activeFilter === 'To-Do' ? 'active' : ''}
              onClick={() => handleFilterClick('To-Do')}
            >
              To-Do
            </button>
            <button
              className={activeFilter === 'Completed' ? 'active' : ''}
              onClick={() => handleFilterClick('Completed')}
            >
              Completed
            </button>
          </div>
        </div>
      </div>
      <Todo
        todos={filteredTodos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        openEditModal={openEditModal}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={currentTodo ? (data) => updateTodo(currentTodo.id, data) : addTodo}
        edit={currentTodo}
      />
    </div>
  );
}

export default TodoList;
