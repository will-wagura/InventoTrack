import React, { useState } from 'react';
import UserList from '../../components/Admin/UserList';
// import AddUserButton from '../../components/Admin/AddUserButton';
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
    console.log(`Toggled activation for user at index ${index}`);
  };

  const handleDelete = (index: number) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    console.log(`Deleted user at index ${index}`);
  };

  // const handleAddUser = () => {
  //   const newUser = { name: 'New User', role: 'Clerk', profilePicture: '/default-avatar.png', isActive: true };
  //   setUsers([...users, newUser]);
  //   console.log('Added new user');
  // };

  // Filter users to only include those with the role 'Clerk'
  const clerks = users.filter(user => user.role === 'Clerk');

  return (
    <div className="manage-user-page">
      <h1>Manage Users</h1>
      <UserList users={clerks} onToggleActivation={handleToggleActivation} onDelete={handleDelete} />
      {/* <AddUserButton onAddUser={handleAddUser} /> */}
    </div>
  );
};

export default ManageUserPage;