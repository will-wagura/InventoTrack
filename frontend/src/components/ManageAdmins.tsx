
// components/ManageAdmins.tsx
import React, { useState } from 'react';

interface Admin {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
}

const ManageAdmins: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([
    { id: 1, name: 'Admin 1', email: 'admin1@example.com', status: 'active' },
    { id: 2, name: 'Admin 2', email: 'admin2@example.com', status: 'inactive' },
  ]);

  const toggleAdminStatus = (id: number) => {
    setAdmins(admins.map(admin =>
      admin.id === id ? { ...admin, status: admin.status === 'active' ? 'inactive' : 'active' } : admin
    ));
  };

  const deleteAdmin = (id: number) => {
    setAdmins(admins.filter(admin => admin.id !== id));
  };

  return (
    <div>
      <h2>Manage Admins</h2>
      <ul>
        {admins.map(admin => (
          <li key={admin.id}>
            {admin.name} - {admin.email} - {admin.status}
            <button onClick={() => toggleAdminStatus(admin.id)}>
              {admin.status === 'active' ? 'Deactivate' : 'Activate'}
            </button>
            <button onClick={() => deleteAdmin(admin.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageAdmins;