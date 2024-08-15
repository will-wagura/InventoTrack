import React, { useState } from 'react';
import './AddUserModal.css';

interface AddUserModalProps {
  onAddUser: (name: string, role: string, profilePicture: string) => void;
  onClose: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ onAddUser, onClose }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('Clerk');
  const [profilePicture, setProfilePicture] = useState<string | ArrayBuffer | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (typeof profilePicture === 'string') {
      onAddUser(name, role, profilePicture);
      onClose();
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add New User</h2>
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="Clerk">Clerk</option>
          <option value="Admin">Admin</option>
        </select>

        <label>Profile Picture</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {profilePicture && (
          <img src={profilePicture as string} alt="Profile Preview" className="profile-preview" />
        )}

        <button onClick={handleSubmit}>Add User</button>
        <button onClick={onClose} className="close-btn">Close</button>
      </div>
    </div>
  );
};

export default AddUserModal;
