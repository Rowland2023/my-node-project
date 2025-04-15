const express = require("express");
const con = require("../config/db"); // Import database connection

const router = express.Router();

router.get("/employees", (req, res) => {
  con.query("SELECT * FROM employee;", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});
router.post("/employees", (req, res) => {
    const { name, age, salary } = req.body;
    
    // Ensure all required fields are present
    if (!name || !age || !salary) {
      return res.status(400).json({ error: "All fields (name, age, salary) are required" });
    }
  
    const insertQuery = `INSERT INTO employee (name, age, salary) VALUES (?, ?, ?);`;
  
    con.query(insertQuery, [name, age, salary], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Employee added successfully!", employeeId: result.insertId });
    });
  });
  router.put("/employees/:id", (req, res) => {
    const { id } = req.params;
    const { name, age, salary } = req.body;
  
    // Ensure at least one field is provided for updating
    if (!name && !age && !salary) {
      return res.status(400).json({ error: "Provide at least one field to update" });
    }
  
    const updateQuery = `UPDATE employee SET name = ?, age = ?, salary = ? WHERE id = ?;`;
  
    con.query(updateQuery, [name, age, salary, id], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "✅ Employee updated successfully!" });
    });
  });
  router.delete("/employees/:id", (req, res) => {
    const { id } = req.params;
  
    const deleteQuery = `DELETE FROM employee WHERE id = ?;`;
  
    con.query(deleteQuery, [id], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "❌ Employee deleted successfully!" });
    });
  });
  router.get("/employees", (req, res) => {
    const { page = 1, limit = 5 } = req.query; // Default: page 1, limit 5 records per page
    const offset = (page - 1) * limit; // Calculate offset
  
    const paginatedQuery = `SELECT * FROM employee LIMIT ? OFFSET ?;`;
  
    con.query(paginatedQuery, [parseInt(limit), parseInt(offset)], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  });
  
    
  

module.exports = router;
