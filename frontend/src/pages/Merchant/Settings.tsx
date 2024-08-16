import React, { useState } from 'react';
import '../../styles/Merchant/SettingsPage.css';
import { FaUserCog, FaLock, FaUser } from 'react-icons/fa';

// General Settings Component
const GeneralSettings: React.FC = () => {
    const [siteTitle, setSiteTitle] = useState('');
    const [timezone, setTimezone] = useState('UTC');
    const [language, setLanguage] = useState('en');

    const handleSave = () => {
        // Implement saving logic here
        console.log('General settings saved:', { siteTitle, timezone, language });
    };

    return (
        <div className="settings-form">
            <h3>Site Title</h3>
            <input
                type="text"
                value={siteTitle}
                onChange={(e) => setSiteTitle(e.target.value)}
                placeholder="Enter site title"
            />
            <h3>Timezone</h3>
            <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
            >
                <option value="UTC">UTC</option>
                <option value="PST">PST</option>
                <option value="EST">EST</option>
                {/* Add more options as needed */}
            </select>
            <h3>Language</h3>
            <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
            >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                {/* Add more options as needed */}
            </select>
            <button className="btn-primary" onClick={handleSave}>Save General Settings</button>
        </div>
    );
};

// Security Settings Component
const SecuritySettings: React.FC = () => {
    const handleSecurityUpdate = () => {
        // Implement security settings update logic
        console.log('Security settings updated');
    };

    return (
        <div className="settings-form">
            <h3>Security Questions</h3>
            <input type="text" placeholder="Security question 1" />
            <input type="text" placeholder="Answer" />
            <input type="text" placeholder="Security question 2" />
            <input type="text" placeholder="Answer" />
            <button className="btn-primary" onClick={handleSecurityUpdate}>Update Security Questions</button>
        </div>
    );
};

// Account Settings Component
const AccountSettings: React.FC = () => {
    const handleProfileUpdate = () => {
        // Implement profile update logic
        console.log('Profile updated');
    };

    const handlePasswordUpdate = () => {
        // Implement password update logic
        console.log('Password updated');
    };

    return (
        <div className="settings-form">
            <h3>Profile Picture</h3>
            <input type="file" accept="image/*" />
            <button className="btn-primary" onClick={handleProfileUpdate}>Update Profile Picture</button>

            <h3>Change Password</h3>
            <input type="password" placeholder="New password" />
            <input type="password" placeholder="Confirm new password" />
            <button className="btn-primary" onClick={handlePasswordUpdate}>Update Password</button>
        </div>
    );
};

const Settings: React.FC = () => {
    return (
        <div className="settings">
             <header className="settings-header">
                <h1>Settings</h1>
            </header>
        <div className="settings-page">
           
            <section className="settings-content">
                <div className="settings-section general-settings">
                    <h2><FaUserCog /> General Settings</h2>
                    <GeneralSettings />
                </div>
                <div className="settings-section security-settings">
                    <h2><FaLock /> Security Settings</h2>
                    <SecuritySettings />
                </div>
                <div className="settings-section account-settings">
                    <h2><FaUser /> Account Settings</h2>
                    <AccountSettings />
                </div>
            </section>
        </div>
        </div>
    );
};

export default Settings;