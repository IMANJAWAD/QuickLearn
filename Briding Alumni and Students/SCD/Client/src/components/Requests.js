import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Requests = () => {
  const { id } = useParams();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const response = await fetch(`/api/requests/${id}`);
      const data = await response.json();
      setRequests(data);
    };
    fetchRequests();
  }, [id]);

  const handleRequestStatusChange = async (requestID, status) => {
    const response = await fetch(`/api/requests/${requestID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    const data = await response.json();
    alert(data.message);
    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.requestID === requestID ? { ...req, status } : req
      )
    );
  };

  return (
    <div>
      <h2>Student Requests</h2>
      <ul>
        {requests.map((request) => (
          <li key={request.requestID}>
            <p>Message: {request.message}</p>
            <p>Status: {request.status}</p>
            <button onClick={() => handleRequestStatusChange(request.requestID, 'Accepted')}>Accept</button>
            <button onClick={() => handleRequestStatusChange(request.requestID, 'Rejected')}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Requests;
