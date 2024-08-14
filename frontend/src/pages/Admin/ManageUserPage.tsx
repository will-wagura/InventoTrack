import React, { useState } from 'react';
import UserList from '../../components/Admin/UserList';
import AddUserButton from '../../components/Admin/AddUserButton';
import './ManageUserPage.css';

const ManageUserPage: React.FC = () => {
  const [users, setUsers] = useState([
    { name: 'John Doe', role: 'Admin', profilePicture: '/avatar.jpg', isActive: true },
    { name: 'Jane Smith', role: 'Clerk', profilePicture: '/avatar 2.png', isActive: true }
  ]);

  const handleToggleActivation = (index: number) => {
    const updatedUsers = [...users];
    updatedUsers[index] = { ...updatedUsers[index], isActive: !updatedUsers[index].isActive };
    setUsers(updatedUsers);
  };

  const handleDelete = (index: number) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  const handleAddUser = (name: string, role: string, profilePicture: string) => {
    const newUser = { name, role, profilePicture, isActive: true };
    setUsers([...users, newUser]);
  };

  const clerks = users.filter(user => user.role === 'Clerk');

  return (
    <div className="manage-user-page">
      <h1>Manage Users</h1>
      <UserList users={clerks} onToggleActivation={handleToggleActivation} onDelete={handleDelete} />
      <AddUserButton onAddUser={handleAddUser} />
    </div>
  );
};

export default ManageUserPage;
