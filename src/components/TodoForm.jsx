import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Todo.css';

const TodoForm = ({ onSubmit, onCancel, edit }) => {
  const formik = useFormik({
    initialValues: {
      name: edit ? edit.name : '',
      description: edit ? edit.description : '',
      category: edit ? edit.category : '',
      date: edit ? edit.date : '',
      priority: edit ? edit.priority : 'medium',
      fulfillment: edit ? edit.fulfillment : 0,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Task name is required'),
      description: Yup.string(),
      category: Yup.string(),
      date: Yup.date().required('Date is required'),
      priority: Yup.string()
        .required('Priority is required')
        .oneOf(['low', 'medium', 'high'], 'Invalid priority'),
      fulfillment: Yup.number(),
    }),
    onSubmit: values => {
      const todoData = {
        id: edit ? edit.id : Math.floor(Math.random() * 10000),
        ...values,
      };

      // Save the todo to local storage
      const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
      if (edit) {
        const updatedTodos = savedTodos.map(todo =>
          todo.id === edit.id ? todoData : todo
        );
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
      } else {
        savedTodos.push(todoData);
        localStorage.setItem('todos', JSON.stringify(savedTodos));
      }

      onSubmit(todoData);
      formik.resetForm();
    },
  });

  useEffect(() => {
    // Load form data from local storage when the component mounts (if edit is not active)
    if (!edit) {
      const savedForm = JSON.parse(localStorage.getItem('formValues'));
      if (savedForm) {
        formik.setValues(savedForm);
      }
    }
  }, [edit]);

  useEffect(() => {
    // Save form data to local storage whenever form values change
    localStorage.setItem('formValues', JSON.stringify(formik.values));
  }, [formik.values]);

  return (
    <form onSubmit={formik.handleSubmit} className="todo-form">
      <div className="left-fields">
        <label>
          Task Name
          <input
            type="text"
            name="name"
            placeholder="name for the task you’re going to do"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="error">{formik.errors.name}</div>
          ) : null}
        </label>
        <label>
          Description
          <input
            type="text"
            name="description"
            placeholder="a short description of the task - can be omitted"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </label>
        <label>
          Category
          <input
            type="text"
            name="category"
            placeholder="e.g. household, school, work"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </label>
        <label>
          Date
          <input
            type="date"
            name="date"
            placeholder="dd/mm/yyyy - can be omitted"
            value={formik.values.date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.date && formik.errors.date ? (
            <div className="error">{formik.errors.date}</div>
          ) : null}
        </label>
      </div>

      <div className="priority-fulfillment">
        <label>
          Priority
          <select
            name="priority"
            value={formik.values.priority}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {formik.touched.priority && formik.errors.priority ? (
            <div className="error">{formik.errors.priority}</div>
          ) : null}
        </label>
        <label>
          Fulfillment (%)
          <input
            className="fulfillment"
            type="range"
            name="fulfillment"
            placeholder="Fulfillment (%)"
            value={formik.values.fulfillment === 0 ? '' : formik.values.fulfillment}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            max="100"
            min="0"
          />
          {formik.touched.fulfillment && formik.errors.fulfillment ? (
            <div className="error">{formik.errors.fulfillment}</div>
          ) : null}
        </label>
      </div>

      <div className="buttons">
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default TodoForm;
