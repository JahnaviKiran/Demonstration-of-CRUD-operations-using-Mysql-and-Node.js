const { request } = require('express');
const express = require('express');
const mysql = require('mysql');


//create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql1'
})

//connect to Myql
db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('mysql connected')
})

const app = express();

//create database
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql1';
    db.query(sql, err => {
        if (err) {
            throw err;
        }
        res.send('databse created');
    })
})

//create table
app.get('/createstudentdata', (req, res) => {
    let sql = 'CREATE TABLE studentdata( SNo int(255), Name VARCHAR(255), Phone CHAR(10), Email VARCHAR(255), Course VARCHAR(255), PRIMARY KEY (SNo))';
    db.query(sql, err => {
        if (err) {
            throw err;
        }
        res.send('Student data table created');
    })
})


// Insert student data
app.get('/student1', (req, res) => {
    let post = { SNo: 1, Name: 'studentA', Phone: '9837465738', Email: 'studenta@gmail.com', Course: 'HTML' };
    let sql = 'INSERT INTO studentdata SET ?'
    let query = db.query(sql, post, err => {
        if (err) {
            throw err;
        }
        res.send('Student data added');
    })
})
app.get('/student2', (req, res) => {
    let post = { SNo: 2, Name: 'studentB', Phone: '9838374868', Email: 'studentb@gmail.com', Course: 'CSS' };
    let sql = 'INSERT INTO studentdata SET ?'
    let query = db.query(sql, post, err => {
        if (err) {
            throw err;
        }
        res.send('Student data added');
    })
})
app.get('/student3', (req, res) => {
    let post = { SNo: 3, Name: 'studentC', Phone: '9328487238', Email: 'studentc@gmail.com', Course: 'JavaScript' };

    let sql = 'INSERT INTO studentdata SET ?'
    let query = db.query(sql, post, err => {
        if (err) {
            throw err;
        }
        res.send('Student data added');
    })
})

//select student (displayed in terminal)
app.get('/getstudent', (req, res) => {
    let sql = 'SELECT * FROM studentdata'
    let query = db.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
        res.send('Student data retrieved');
        console.log(results)
    })
})

//update student details
app.get('/updatestudent/:SNo', (req, res) => {
    let newName = 'Updated name'
    let sql = `UPDATE studentdata SET name = '${newName}' WHERE SNo = ${req.params.SNo}`

    let query = db.query(sql, err => {
        if (err) {
            throw err;
        }
        res.send('Student data updated');

    })
})

//delete student data
app.get('/deletestudent/:SNo', (req, res) => {
    let sql = `DELETE FROM studentdata WHERE SNo = ${req.params.SNo}`
    let query = db.query(sql, err => {
        if (err) {
            throw err;
        }
        res.send('Student data deleted');
    })
})


app.listen('3000', () => {
    console.log('server started on 3000');
})