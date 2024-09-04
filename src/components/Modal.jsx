import React from 'react';
import './Modal.css'; 
import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';
const Modal = ({ isOpen, onClose, onSubmit, edit }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <RiCloseCircleLine className="modal-close" onClick={onClose}/>
        <TodoForm onSubmit={onSubmit} onCancel={onClose} edit={edit} />
      </div>
    </div>
  );
};

export default Modal;
