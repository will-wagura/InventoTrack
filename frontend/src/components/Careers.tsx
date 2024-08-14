import "./Careers.css";

function Careers() {
  const jobListings = [
    {
      title: "Software Engineer",
      department: "Engineering",
      location: "Remote",
    },
    { title: "Product Manager", department: "Product", location: "Mombasa" },
    { title: "UX Designer", department: "Design", location: "Nakuru" },
    { title: "Sales Representative", department: "Sales", location: "Isiolo" },
  ];

  return (
    <div className="careers">
      <h1>Careers at InventoTrack</h1>
      <p>Join our team and help shape the future of inventory management!</p>

      <h2>Open Positions</h2>
      <div className="job-listings">
        {jobListings.map((job, index) => (
          <div key={index} className="job-card">
            <h3>{job.title}</h3>
            <p>Department: {job.department}</p>
            <p>Location: {job.location}</p>
            <button className="apply-btn">Apply Now</button>
          </div>
        ))}
      </div>

      <h2>Why Work With Us?</h2>
      <ul>
        <li>Innovative and fast-paced environment</li>
        <li>Competitive salary and benefits</li>
        <li>Professional growth opportunities</li>
        <li>Flexible work arrangements</li>
      </ul>
    </div>
  );
}

export default Careers;
