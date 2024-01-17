const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const con = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "register"
})

app.post('/register', (requestObject, responseObject) => {
    const email = requestObject.body.email;
    const username = requestObject.body.username;
    const password = requestObject.body.password;

    con.query("INSERT INTO users (email, username, password) VALUES (?, ?, ?)", [email, username, password],
        (err, result) => {
            if (result) {
                responseObject.send(result);
            } else {
                responseObject.send({
                    message: "ENTER CORRECT ASKED DETAILS!"
                })
            }
        }
    )
})

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    con.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password],
        (err, result) => {
            if (err) {
                req.setEncoding({ err: err });
            } else {
                if (result.length > 0) {
                    console.log("------result--------");
                    console.log(result);
                    res.send(result[0]);
                } else {
                    res.send({ message: "WRONG USERNAME OR PASSWORD!" })
                }
            }
        }
    )
})

app.listen(3001, () => {
    console.log("running backend server");
})