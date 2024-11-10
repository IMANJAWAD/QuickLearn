import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [alumni, setAlumni] = useState(null);

  useEffect(() => {
    // Fetch alumni data from backend
    const fetchAlumniData = async () => {
      const response = await fetch('/api/alumni/1'); // Replace with dynamic ID
      const data = await response.json();
      setAlumni(data);
    };
    fetchAlumniData();
  }, []);

  return (
    <div>
      <h1>Alumni Dashboard</h1>
      {alumni && (
        <div>
          <h2>Welcome, {alumni.alumniDetails}</h2>
          <Link to={`/profile/${alumni.alumniID}`}>Edit Profile</Link>
          <br />
          <Link to={`/requests/${alumni.alumniID}`}>View Requests</Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
