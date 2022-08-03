const express = require("express");
const app = express();
const db = require("better-sqlite3")("db.sqlite");
const jwt = require("jsonwebtoken");
require("dotenv").config();


app.post("/api/authenticate", (req, res) => {
    const token = req.cookies["token"];
    try {
        const user = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = user;
        res.json({status: 403});
    } catch (e) {
        res.sendStatus(403);
    }
});
function authenticate(req, res) {
    
}

app.listen(1000);
app.use(express.json());
app.use(express.static("public"));


app.post("/api/login", (req, res) => {
    const {username, password} = req.body;

    const user = db.prepare("select * from users where username=@username and password=@password").get({ username, password });

    if(user) {
        console.log("user authenticated");
        const token = jwt.sign(user, process.env.TOKEN_SECRET);
        res.cookie("token", token);
        res.json({ token });
    }
    else {
        res.sendStatus(403);
    }
});

app.post("/api/signup", (req, res) => {

    const signup = req.body;
    console.log(signup)
    const {SSN, name, surname, age, username, password} = req.body;

    const check = db.prepare("SELECT * FROM users WHERE SSN=@SSN;").get({SSN});
    
    console.log(check);

    if(SSN == "" || name == "" || surname == "" || age == null || username == "" || password == "" ){
        res.json({status: "missing information"});
    }
    else if (check) {
        res.json({status: "exists"});
        
    } else {
        const newUser = db.prepare("INSERT INTO users VALUES (@SSN, @name, @surname, @age, @username, @password);");
        newUser.run(signup);
        res.json({status: "SignUpSuccessful"});
    }  
    // console.log();
});
