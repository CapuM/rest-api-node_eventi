const express = require("express");
const app = express();
//const nodemon = require("nodemon");
const mysql = require("mysql");

//app.use(nodemon);


const mysqlconnection = mysql.createConnection({
    host: 'localhost',
    user: "root",
    database: "eventi_test",
    password: ""
});

mysqlconnection.connect((err) => {
    if (!err)
        console.log("Db fggv ");
    else
        console.log(err);
})

app.listen(3000, '127.0.0.1', () => {
    console.log("wowo")
})

app.get("/events", (req, res) => {
    mysqlconnection.query("SELECT nome_eve,data_inizio,data_fine,vie.nome_via FROM evento as eve JOIN elenco_vie as vie ON eve.cod = vie.cod_eve ",
        (err, rows, fields) => {
            console.log(rows, fields)
            res.json(rows)
        })
})

app.get("/spazi", (req, res) => {
    mysqlconnection.query("SELECT * FROM dati_spazio",
        (err, rows, fields) => {
            console.log(rows, fields)
            res.json(rows)
        })
})


app.post("/dati_spazio/:stato_spazio/:cod_spazio", (req, res) => {
    var stato_spazio = req.params.stato_spazio
    var cod_spazio = req.params.cod_spazio
    mysqlconnection.query('UPDATE `dati_spazio` SET `stato_spazio` =' + stato_spazio + "WHERE `dati_spazio`.`cod` ' =" + cod_spazio,
        (err, rows, fields) => {
            console.log(rows, cfields)
            res.json(rows)
        }
    )
})

app.get("/users/:username/:password", (req, res) => {
    var uname = req.params['username']
    var pwd = req.params['password']
    console.log(uname)

    mysqlconnection.query("INSERT INTO USERS(username, password) VALUES ('" + uname + "','" + pwd + "')",
        (err, rows, fields) => {
            if (err) console.log(err)
            console.log(rows, fields)
            res.json(fields)
        })
    res.json(res.data)
})

app.get("/users/:id", (req, res) => {
    var id = req.params.id;
    mysqlconnection.
        query("SELECT * FROM USERS WHERE id='" + id + "'", (err, rows, fields) => {
            if (err)
                res.status(404).send({ error: err })
            if (rows.length == 0) {
                console.log('soccazzi', rows.length)
                res.status(205).send({ error: 'no data' })
            } else {
                console.log('8888888', rows.length)
                res.json(rows)
            }
        });
})
