import React from 'react';
import UserItem from './UserItem';
import './UserList.css';

interface UserListProps {
  users: { name: string; role: string; profilePicture: string; isActive: boolean; }[];
  onToggleActivation: (index: number) => void;
  onDelete: (index: number) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onToggleActivation, onDelete }) => {
  return (
    <div className="user-list">
      {users.map((user, index) => (
        <UserItem
          key={index}
          name={user.name}
          role={user.role}
          profilePicture={user.profilePicture}
          isActive={user.isActive}
          onToggleActivation={() => onToggleActivation(index)}
          onDelete={() => onDelete(index)}
        />
      ))}
    </div>
  );
};

export default UserList;
