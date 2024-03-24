const mysql = require('mysql2');


const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

console.log("Moew"+process.env.DB_NAME);

connection.on('error', (err) => {
  console.error('Error connecting to MySQL:', err);
});

connection.on('connect', () => {
  console.log('Connected to database');
});

connection.on('end', () => {
  console.log('Connection closed');
});

module.exports = connection;
