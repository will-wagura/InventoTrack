import React from 'react';
import './UserItem.css';

interface UserItemProps {
  name: string;
  role: string;
  profilePicture: string;
  isActive: boolean;
  onToggleActivation: () => void;
  onDelete: () => void;
}

const UserItem: React.FC<UserItemProps> = ({ name, role, profilePicture, isActive, onToggleActivation, onDelete }) => {
  return (
    <div className="user-item">
      <img src={profilePicture} alt={`${name}'s profile`} className="profile-picture" />
      <div className="user-info">
        <span className="user-name">{name}</span>
        <span className="user-role">{role}</span>
        <span className={`user-status ${isActive ? 'active' : 'deactivated'}`}>
          {isActive ? 'Active' : 'Deactivated'}
        </span>
      </div>
      <div className="user-actions">
        <button
          className={isActive ? "deactivate-btn" : "activate-btn"}
          onClick={onToggleActivation}
        >
          {isActive ? "Deactivate" : "Activate"}
        </button>
        <button className="delete-btn" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default UserItem;
