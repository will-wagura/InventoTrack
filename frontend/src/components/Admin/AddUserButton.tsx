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
    </div>
  );
};

export default AddUserButton;
