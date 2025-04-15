const con = require("./db"); // Import MySQL connection

const insertQuery = `INSERT INTO employee (name, age, salary) VALUES ('John Doe', 30, 50000);`;

con.query(insertQuery, (err, result) => {
  if (err) throw err;
  console.log("✅ Data inserted successfully!");
});

con.end();
