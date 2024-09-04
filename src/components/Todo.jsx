import React from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import './Todo.css';
// save edildikden sonra todolar hansiki gorunur o table 
const Todo = ({ todos, completeTodo, removeTodo, openEditModal }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Task Name</th>
          <th>Description</th>
          <th>Category</th>
          <th>Date</th>
          <th>Priority</th>
          <th>Fulfillment</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
  {todos.map((todo, index) => (
    <tr key={index} className={todo.isComplete ? 'todo-row complete' : 'todo-row'}>
      <td onClick={() => completeTodo(todo.id)}>{todo.name}</td>
      <td>{todo.description}</td>
      <td>{todo.category}</td>
      <td>{todo.date}</td>
      <td>{todo.priority}</td>
      <td>{todo.fulfillment}%</td>
      <td style={{ display: 'flex' }}>
        <RiCloseCircleLine
          onClick={() => removeTodo(todo.id)}
          className='delete-icon'
        />
        <TiEdit
          onClick={() => openEditModal(todo)}
          className='edit-icon'
        />
      </td>
    </tr>
  ))}
</tbody>

    </table>
  );
};

export default Todo;




