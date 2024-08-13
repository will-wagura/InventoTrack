

import React, { useState, useEffect } from "react";
import "../../styles/Merchant/ManageUsers.css";

interface Admin {
  id: number;
  name: string;
  email: string;
  status: "Active" | "Inactive";
}

const ManageUsers: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>(() => {
    // Retrieve admins from localStorage or set initial state
    const storedAdmins = localStorage.getItem("admins");
    return storedAdmins ? JSON.parse(storedAdmins) : [
      { id: 1, name: "John Doe", email: "john@example.com", status: "Active" },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        status: "Inactive",
      },
    ];
  });

  const [newAdmin, setNewAdmin] = useState<Admin>({
    id: 0,
    name: "",
    email: "",
    status: "Active",
  });

  // Save admins to localStorage whenever admins state changes
  useEffect(() => {
    localStorage.setItem("admins", JSON.stringify(admins));
  }, [admins]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAdmin((prevAdmin) => ({
      ...prevAdmin,
      [name]: value,
    }));
  };

  const handleAddAdmin = () => {
    if (newAdmin.name && newAdmin.email) {
      setAdmins((prevAdmins) => [
        ...prevAdmins,
        { ...newAdmin, id: prevAdmins.length + 1 },
      ]);
      setNewAdmin({ id: 0, name: "", email: "", status: "Active" });
    }
  };

  const handleDeactivateAdmin = (id: number) => {
    setAdmins((prevAdmins) =>
      prevAdmins.map((admin) =>
        admin.id === id ? { ...admin, status: "Inactive" } : admin
      )
    );
  };

  const handleDeleteAdmin = (id: number) => {
    setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.id !== id));
  };

  return (
    <div className="users">
         <header className="users-header">
                <h1>Manage User</h1>
            </header>
    <div className="manage-users">
   

      <div className="add-admin">
        <h3>Add New Admin</h3>
        <input
          type="text"
          name="name"
          value={newAdmin.name}
          onChange={handleInputChange}
          placeholder="Admin Name"
        />
        <input
          type="email"
          name="email"
          value={newAdmin.email}
          onChange={handleInputChange}
          placeholder="Admin Email"
        />
        <button onClick={handleAddAdmin}>Add Admin</button>
      </div>

      <div className="admin-list">
        <h3>Admin List</h3>
        <ul>
          {admins.map((admin) => (
            <li key={admin.id}>
              <span>
                {admin.name} ({admin.email}) - {admin.status}
              </span>
              <div className="buttons">
              <button onClick={() => handleDeactivateAdmin(admin.id)}>
                Deactivate
              </button>
              <button onClick={() => handleDeleteAdmin(admin.id)}>
                Delete
              </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
};

export default ManageUsers;
