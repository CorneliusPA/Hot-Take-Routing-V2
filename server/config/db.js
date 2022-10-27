const mysql = require("mysql")

const db = mysql.createPool({

    user: "bd5f06d6495ba3",
    password: "0dc412a0",
    host: "us-cdbr-east-06.cleardb.net",
    database: "heroku_d91a79dd7efdf9e",
    
    })

module.exports = db;