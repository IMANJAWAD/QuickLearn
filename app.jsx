import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [breakInterval, setBreakInterval] = useState(30); 
  const [feedback, setFeedback] = useState('');
  const [notification, setNotification] = useState(null);
  const socket = new WebSocket('ws://localhost:8080');

  useEffect(() => {
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setNotification(message);
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleToggleBreakPlan = async () => {
    const response = await fetch('http://localhost:8080/toggle-break-plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 1, timeInterval: breakInterval })
    });
    const result = await response.json();
    alert(result.message);
  };

  const handleFeedbackSubmit = async () => {
    const response = await fetch('http://localhost:8080/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 1, feedback })
    });
    const result = await response.json();
    alert(result.message);
    setFeedback('');
  };

  return (
    <div className="App">
      <h1>Wellness and Support</h1>
      
      <div className="section">
        <label>Set Break Interval (minutes):</label>
        <input
          type="number"
          value={breakInterval}
          onChange={(e) => setBreakInterval(e.target.value)}
        />
        <button onClick={handleToggleBreakPlan}>Save Break Plan</button>
      </div>

      <div className="section">
        <label>Submit Feedback:</label>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        ></textarea>
        <button onClick={handleFeedbackSubmit}>Submit Feedback</button>
      </div>

      {notification && (
        <div className="notification">
          <p>{notification.message}</p>
          <p>Tip: {notification.tip}</p>
        </div>
      )}
    </div>
  );
};

export default App;
