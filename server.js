const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const mysql = require('mysql2');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'wellness_app'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

app.use(express.json());

wss.on('connection', (ws) => {
  console.log('New client connected');
  
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

app.post('/toggle-break-plan', (req, res) => {
  const { userId, timeInterval } = req.body;
  
  const query = 'UPDATE users SET break_interval = ? WHERE user_id = ?';
  db.query(query, [timeInterval, userId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Break plan updated successfully' });
  });
});

app.post('/feedback', (req, res) => {
  const { userId, feedback } = req.body;
  
  const query = 'INSERT INTO feedback (user_id, feedback) VALUES (?, ?)';
  db.query(query, [userId, feedback], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Feedback submitted successfully' });
  });
});

const healthTips = [ //hardcoded
  { type: 'physical', tip: 'Take a quick walk around.' },
  { type: 'mental', tip: 'Take a deep breath and clear your mind.' }
];

app.get('/health-tip', (req, res) => {
  const type = req.query.type;
  const tip = healthTips.find(t => t.type === type);
  res.json(tip || healthTips[0]);
});

function sendBreakReminder(userId) {
  const reminder = { message: 'Time for a break!', tip: healthTips[0].tip };
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(reminder));
    }
  });
}

app.post('/trigger-reminder', (req, res) => {
  const { userId } = req.body;
  sendBreakReminder(userId);
  res.json({ message: 'Break reminder sent' });
});

server.listen(8080, () => {
  console.log('Server running on http://localhost:8080');
});
