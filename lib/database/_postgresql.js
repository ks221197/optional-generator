const mysql = require("mysql");

const database = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "blog",
  })
  database.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySql Connected");
});

module.exports=database