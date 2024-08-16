// src/components/Teams.js
import "./team.css";

// Import images
import abdulbarikImage from "./IMG20230721124305.jpg";
import steffiImage from "./IMG20230721124305.jpg";
import williamImage from "./IMG20230721124305.jpg";
import josephImage from "./IMG20230721124305.jpg";
import victorImage from "./IMG20230721124305.jpg";

interface Props {
  setActiveComponent?: React.Dispatch<React.SetStateAction<string>>;
}

function Teams({ setActiveComponent }: Props) {
  console.log(setActiveComponent);

  const teamMembers = [
    {
      name: "Abdulbarik Mohamed",
      role: "CEO & Founder",
      image: abdulbarikImage,
    },
    { name: "Steffi Kamau", role: "Lead Designer", image: steffiImage },
    { name: "William Wagura", role: "Lead Designer", image: williamImage },
    { name: "Joseph Wanini", role: "Lead Designer", image: josephImage },
    { name: "Victor Gachure", role: "Lead Designer", image: victorImage },
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
    </div>
  );
}

export default Teams;
