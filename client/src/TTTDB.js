import React from 'react'

const express = require('express');
const mysql = require('mysql');

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'Corn',
    password: 'Super000',
    database: 'turbo_tiger_trades_db'
});

db.connect();

app.get('/products',(req, res) => {
    const sql = 'SELECT * FROM products';

    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);

    });
});

app.listen(5000, () => console.log('Server started on port 5000'));

function TTTDB() {
  return (
    <h1/>
        
  )
}

export default TTTDB