const con = require("./db");

const filterQuery = `SELECT * FROM employee WHERE salary > 40000;`; // get specific employee use WERE

con.query(filterQuery, (err, results) => {
  if (err) throw err;
  console.log("📌 Employees with salary above 40,000:", results);
});

con.end();
