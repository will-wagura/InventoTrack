<<<<<<< HEAD
import React, { useState } from 'react';
import AddUserModal from './AddUserModal';
import './AddUserButton.css';

interface AddUserButtonProps {
  onAddUser: (name: string, role: string, profilePicture: string) => void;
}

const AddUserButton: React.FC<AddUserButtonProps> = ({ onAddUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="add-user">
      <button className="add-user-btn" onClick={handleOpenModal}>Add New User</button>
      {isModalOpen && <AddUserModal onAddUser={onAddUser} onClose={handleCloseModal} />}
=======
import React from 'react';
import './AddUserButton.css';

interface AddUserButtonProps {
  onAddUser: () => void;
}

const AddUserButton: React.FC<AddUserButtonProps> = ({ onAddUser }) => {
  return (
    <div className="add-user">
      <button className="add-user-btn" onClick={onAddUser}>Add New User</button>
>>>>>>> 28f47f84ffbec8cbf831c5214112643810d4ff81
    </div>
  );
};

export default AddUserButton;
