const express = require('express');
const app = express() ;
const bodyParser = require("body-parser");
const cors = require("cors")
const mySql = require("mysql2");
require('dotenv').config();

const db = mySql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(5000, () => {
    console.log("Server running on Port: 5000");
});

app.get("/api/get", (req,res) => {
    const sqlGet = "SELECT * FROM contact_db";
    db.query(sqlGet,(err,result) => {
        res.send(result);
    })
})

app.post("/api/post", (req,res) => {
    const {name,email,contact} = req.body;
    const sqlInsert = "INSERT INTO contact_db (name,email,contact) VALUES (? , ?, ?)";
    db.query(sqlInsert, [name,email,contact], (err,result) => {
        if(err){
            console.log(err)
        }
    });
})

app.delete("/api/delete/:id", (req,res) => {
    const {id} = req.params;
    const sqlRemove = "DELETE FROM contact_db WHERE id = ?";
    db.query(sqlRemove, id, (err,result) => {
        if(err){
            console.log(err)
        }
    });
})

app.get("/api/get/:id", (req,res) => {
    const {id} = req.params;
    const sqlGetId = "SELECT * FROM contact_db WHERE id = ?";
    db.query(sqlGetId, id, (err,result) => {
        if(err){
            console.log(err)
        }
        res.send(result)
    });
})

app.put("/api/put/:id", (req,res) => {
    const {id} = req.params;
    const {name,email,contact} = req.body;
    const sqlPut = "UPDATE contact_db SET name = ?,email = ?,contact = ? WHERE id = ?";
    db.query(sqlPut, [name,email,contact,id], (err,result) => {
        if(err){
            console.log(err)
        }
    });
})

app.get("/", (req,res) => {
    res.send("Hello,Server");
});