const express = require("express");
const cors = require('cors')                           // Cross-Origin Request Allow            
const fs = require('fs')
const path = require('path');

const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const mysql = require("mysql2");

const pool = mysql.createPool({
  connectionLimit: 5,
  host: "localhost",
  user: "root",
  database: "phones",
  password: "vinegar"
});


const app = express();

app.use(express.static(path.join(__dirname, 'asset')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'asset', 'index.html'));
});

// =======================================

app.use("/phones", cors(), (req, res) => {
  pool.query("SELECT * FROM phones WHERE deleted=0", function (err, data) {
    if (err) return console.log(err);
    res.send({
      phones: data
    })
  });
})

app.use("/phone", cors(), (req, res) => {
  const operator = req.query.operator
  const range = req.query.range
  const status = req.query.status
  pool.query("SELECT * FROM phones WHERE telecom=? AND range=? AND status=? AND deleted=0 AND busy=0 ORDER BY RAND() LIMIT 1", [operator, range, status], function (err, data) {
    if (err) return console.log(err);
    if (data.length) {
      const phoneData = data[0]
      const id = phoneData.id
      const sql = "UPDATE phones SET busy=1 WHERE id=" + id
      pool.query(sql, [id], function (err, data) {
        if (err) return console.log(err);
        res.send(phoneData)
      })
    } else {
      res.send({
        error: true,
        message: 'Not Fount'
      })
    }
  })
})

app.use("/free-busy", cors(), (req, res) => {
  const id = req.query.id
  const sql = "UPDATE phones SET busy=0 WHERE id=" + id
  pool.query(sql, function (err, data) {
    if (err) return console.log(err);
    res.send(data)
  })
})

app.use("/phone-search", cors(), (req, res) => {
  const phone = req.query.phone
  pool.query("SELECT * FROM phones WHERE phone=?", [phone], function (err, data) {
    if (err) return console.log(err);
    res.send(data)
  });
})

app.use("/update", cors(), (req, res) => {
  const id = req.query.id
  const status = req.query.status
  const sex = req.query.sex
  const age = req.query.age
  const town = req.query.town
  const comment = req.query.comment

  pool.query("UPDATE phones SET status=?, age=?, sex=?, town=?, comment=? WHERE id=?", [status, age, sex, town, comment, id], function (err, data) {
    if (err) return console.log(err);
    const sql = "UPDATE phones SET busy=0 WHERE id=" + id
    pool.query(sql, function (err, data) {
      if (err) return console.log(err);
      res.send(data)
    })
    // pool.query("SELECT * FROM phones WHERE deleted=0", function (err, data) {
    //   if (err) return console.log(err);
    //   res.send({
    //     phones: data
    //   })
    // });
  });
})

app.use("/delete", cors(), (req, res) => {
  let id = req.query.id;
  pool.query("UPDATE phones SET deleted=1 WHERE id=?", [id], function (err, data) {
    if (err) return console.log(err);
    pool.query("SELECT * FROM phones WHERE deleted=0", function (err, data) {
      if (err) return console.log(err);
      res.send({
        phones: data
      })
    });
  });
})

app.use("/add-phone", cors(), (req, res) => {
  let phone = req.query.phone
  let status = req.query.status
  if (!status) {
    status = 0
  }
  const id = Math.round(Math.random() * 10000000)
  let data = [
    {
      id,
      phone: phone,
      status: 0
    }
  ]
  res.send(data);
})

// ===============================

app.use(function (req, res) {
  res.status(404).send('Страница не найдена')
})

app.listen(3000);
