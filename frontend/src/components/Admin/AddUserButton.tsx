import React from 'react';
import './AddUserButton.css';

interface AddUserButtonProps {
  onAddUser: () => void;
}

const AddUserButton: React.FC<AddUserButtonProps> = ({ onAddUser }) => {
  return (
    <div className="add-user">
      <button className="add-user-btn" onClick={onAddUser}>Add New User</button>
    </div>
  );
};

export default AddUserButton;
