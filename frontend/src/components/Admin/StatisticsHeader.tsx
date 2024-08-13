import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { FaTh, FaBars } from 'react-icons/fa';
import './StatisticsHeader.css';

const StatisticsHeader: React.FC = () => {
  return (
    <Row className="statistics-header align-items-center">
      <Col md={6}>
        <input type="text" className="search-bar" placeholder="Search...." />
      </Col>
      <Col md={6} className="text-right">
        <Button variant="outline-primary" className="filter-button">
          Filter : No ID
        </Button>
        <Button variant="outline-secondary" className="view-toggle">
          <FaBars />
        </Button>
        <Button variant="outline-secondary" className="view-toggle">
          <FaTh />
        </Button>
        <div className="user-info">
          <div className="user-avatar">
            <img src="path-to-avatar-image" alt="User Avatar" />
          </div>
          <div className="user-details">
            <span className="user-name">Jack Doe</span>
            <span className="user-role">Admin</span>
          </div>
        </div>
        <div className="notification-icon">
          <i className="bell-icon"></i>
        </div>
      </Col>
    </Row>
  );
};

export default StatisticsHeader;

