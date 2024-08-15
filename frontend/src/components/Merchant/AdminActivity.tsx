import React from 'react';


const AdminActivity: React.FC = () => {
  const activities = {
    peopleAdded: 139,
    productCreated: 283,
    utmCreated: 782,
    emailSendCreated: 1923,
    contentAdded: 103,
    productsUpdated: 477,
    reportsDownloaded: 280,
  };

  return (
    <div className="admin-activity">
      <h3>Admin Activity</h3>
      <ul>
        <li>People Added: {activities.peopleAdded}</li>
        <li>Product Created: {activities.productCreated}</li>
        <li>UTM Created: {activities.utmCreated}</li>
        <li>Email Send Created: {activities.emailSendCreated}</li>
        <li>Content Added: {activities.contentAdded}</li>
        <li>Products Updated: {activities.productsUpdated}</li>
        <li>Reports Downloaded: {activities.reportsDownloaded}</li>
      </ul>
    </div>
  );
};

export default AdminActivity;
