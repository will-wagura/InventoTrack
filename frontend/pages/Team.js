// src/components/Teams.js
import React from 'react';
import './Teams.css';

function Teams({ setActiveComponent }) {
  const teamMembers = [
    { name: 'Abdulbarik Mohamed', role: 'CEO & Founder', image: './WhatsApp Image 2024-08-11 at 17.45.24.jpeg' },
    { name: 'Steffi Kamau', role: 'CTO', image: 'path_to_image2.jpg' },
    { name: 'William Wagura', role: 'Head of Product', image: 'path_to_image3.jpg' },
    { name: 'Joseph Wanini', role: 'Lead Designer', image: 'path_to_image4.jpg' },
    { name: 'Victor Gachure', role: 'Lead Designer', image: 'path_to_image4.jpg' },
  ];

  return (
    <div className="teams">
      <h1>Our Team</h1>
      <p>Meet the passionate individuals behind InventoTrack</p>
      
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member">
            <img src={member.image} alt={member.name} />
            <h3>{member.name}</h3>
            <p>{member.role}</p>
          </div>
        ))}
      </div>

      <h2>Join Our Team</h2>
      <p>Interested in working with us? Check out our <a href="#" onClick={() => setActiveComponent('careers')}>Careers</a> page for open positions!</p>
    </div>
  );
}

export default Teams;