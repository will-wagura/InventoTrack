// src/components/Content.js

import "./Content.css";

function Content() {
  return (
    <div className="content">
      <h1>Content Creation Services</h1>
      <p>Engage your audience with compelling, high-quality content.</p>
      <div className="content-services">
        <div className="service">
          <h3>Blog Writing</h3>
          <p>Informative and engaging blog posts to drive traffic.</p>
        </div>
        <div className="service">
          <h3>Social Media Content</h3>
          <p>Eye-catching posts to boost your social media presence.</p>
        </div>
        <div className="service">
          <h3>Product Descriptions</h3>
          <p>Compelling copy to showcase your products.</p>
        </div>
      </div>
      <button className="cta-button">Start Your Content Strategy</button>
    </div>
  );
}

export default Content;
