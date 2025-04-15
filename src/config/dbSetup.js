const con = require("./db"); // Import database connection

const qry = `CREATE TABLE IF NOT EXISTS employee2 (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(20) NOT NULL,
  age INT,
  salary FLOAT
);`;

con.query(qry, (err, result) => {
  if (err) throw err;
  console.log("✅ Employee table created successfully!");
});

con.query("SHOW TABLES;", (err, tables) => {
  if (err) throw err;
  console.log("📌 Current tables:", tables);
  con.end(); // Close connection after execution
});
