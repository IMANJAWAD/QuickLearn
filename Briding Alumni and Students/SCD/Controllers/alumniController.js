const db = require('../db/db'); // Database connection pleaseeeeeeeee

// Get Alumni Profile
exports.getAlumniProfile = (req, res) => {
  const alumniID = req.params.id;
  const query = "SELECT * FROM Alumni WHERE alumniID = ?";
  db.query(query, [alumniID], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching alumni" });
    }
    res.json(result[0]);
  });
};

// Update Alumni Profile
exports.updateAlumniProfile = (req, res) => {
  const alumniID = req.params.id;
  const { alumniDetails, experience, achievements, availabilityDetails, qualification } = req.body;
  const query = "UPDATE Alumni SET alumniDetails = ?, experience = ?, achievements = ?, availabilityDetails = ?, qualification = ? WHERE alumniID = ?";
  db.query(query, [alumniDetails, experience, achievements, availabilityDetails, qualification, alumniID], (err) => {
    if (err) {
      return res.status(500).json({ message: "Error updating profile" });
    }
    res.status(200).json({ message: "Profile updated successfully" });
  });
};

// Get Requests for Alumni
exports.getRequests = (req, res) => {
  const alumniID = req.params.alumniID;
  const query = "SELECT * FROM Request WHERE alumniID = ?";
  db.query(query, [alumniID], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching requests" });
    }
    res.json(result);
  });
};

// Update Request Status (Accept/Reject)
exports.updateRequestStatus = (req, res) => {
  const requestID = req.params.requestID;
  const { status } = req.body;
  const query = "UPDATE Request SET status = ?, lastUpdate = NOW() WHERE requestID = ?";
  db.query(query, [status, requestID], (err) => {
    if (err) {
      return res.status(500).json({ message: "Error updating request status" });
    }
    res.status(200).json({ message: "Request status updated" });
  });
};
