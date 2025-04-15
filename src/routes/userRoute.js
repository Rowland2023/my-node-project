const express = require("express");
const con = require("../config/db"); // ✅ Import database connection
const router = express.Router();

// 🔹 GET Employees with Pagination
router.get("/employees", (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    const countSql = "SELECT COUNT(*) AS total FROM employee";
    const dataSql = "SELECT * FROM employee LIMIT ? OFFSET ?";

    con.query(countSql, (err, countResult) => {
        if (err) return res.status(500).json({ error: err.message });

        const totalEmployees = countResult[0].total;
        const totalPages = Math.ceil(totalEmployees / limit);

        // 🔹 Prevent requests beyond the available pages
        if (page > totalPages) {
            return res.status(400).json({ error: "Requested page exceeds total pages" });
        }

        con.query(dataSql, [limit, offset], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });

            res.status(200).json({
                totalEmployees,
                currentPage: page,
                totalPages,
                employees: results
            });
        });
    });
});

// 🔹 POST - Add Employee
router.post("/employees", (req, res) => {
    const { name, age, salary } = req.body;

    if (!name || !age || !salary) {
        return res.status(400).json({ error: "All fields (name, age, salary) are required" });
    }

    const insertQuery = "INSERT INTO employee (name, age, salary) VALUES (?, ?, ?)";

    con.query(insertQuery, [name, age, salary], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "✅ Employee added successfully!", employeeId: result.insertId });
    });
});

// 🔹 PUT - Update Employee
router.put("/employees/:id", (req, res) => {
    const { id } = req.params;
    const { name, age, salary } = req.body;

    if (!name && !age && !salary) {
        return res.status(400).json({ error: "Provide at least one field to update" });
    }

    const updateQuery = "UPDATE employee SET name = ?, age = ?, salary = ? WHERE id = ?";

    con.query(updateQuery, [name, age, salary, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(200).json({ message: "✅ Employee updated successfully!" });
    });
});

// 🔹 DELETE - Remove Employee
router.delete("/employees/:id", (req, res) => {
    const { id } = req.params;

    const deleteQuery = "DELETE FROM employee WHERE id = ?";

    con.query(deleteQuery, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(200).json({ message: "❌ Employee deleted successfully!" });
    });
});

// ✅ Export the router for use in server.js
module.exports = router;
