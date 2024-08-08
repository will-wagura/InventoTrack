// components/AddAdminForm.tsx
import React, { useState } from 'react';

const AddAdminForm: React.FC = () => {
  const [adminData, setAdminData] = useState({ name: '', email: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement logic to add new admin
    console.log('Adding new admin:', adminData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={adminData.name}
        onChange={(e) => setAdminData({ ...adminData, name: e.target.value })}
        placeholder="Admin Name"
        required
      />
      <input
        type="email"
        value={adminData.email}
        onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
        placeholder="Admin Email"
        required
      />
      <button type="submit">Add Admin</button>
    </form>
  );
};

export default AddAdminForm;
