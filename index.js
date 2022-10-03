const express = require("express");
const app = express();
const db = require("better-sqlite3")("db.sqlite");
// const jwt = require("jsonwebtoken");
const cookies = require("cookie-parser");

app.use(cookies());
require("dotenv").config();


// app.post("/api/authenticate", (req, res) => {
//     const token = req.cookies["token"];
//     try {
//         const user = jwt.verify(token, process.env.TOKEN_SECRET);
//         req.user = user;
//         res.json({status: 403});
//     } catch (e) {
//         res.sendStatus(403);
//     }
// });

const authenticated = [];

function authenticate(req, res, next) {

    
    
    // const cookie = req.cookies["token"];

    // try {
        
    //     const user = jwt.verify(cookie, process.env.TOKEN_SECRET);
    //     next();
    //     // console.log(user);
    //     // res.json(user);

    // } catch (error) {
    //     console.log("couldnt authenticate user");
    //     res.sendStatus(403);
    // }
    const cookie = req.cookies['loginCookie'];
    // console.log(cookie);
    
    const user = authenticated.filter(i => i?.cookie === cookie)[0];
    console.log(user);
    if (user){
        next();
    }
    else {

        res.sendStatus(403);
    }
}

app.listen(1000);
app.use(express.json());
app.use(express.static("public"));

app.post("/api/login", (req, res) => {

    const {username, password} = req.body;

    const user = db.prepare("select * from users where username=@username and password=@password").get({ username, password });
    if(user) {
        
        // console.log("user authenticated");
        // const token = jwt.sign(user, process.env.TOKEN_SECRET);
        // res.cookie("token", token);
        // res.json({ token });
        
        const cookie = Math.random().toString(16).substring(2);
        authenticated.push({ user: user, cookie });
        res.cookie("loginCookie", cookie);
        // res.sendStatus(200);
        res.json("something");
    }
    else {
        res.sendStatus(403);
    }
});

app.post("/api/signup", (req, res) => {

    const signup = req.body;
    console.log(signup);
    const {SSN, name, surname, age, username, password} = req.body;

    const check = db.prepare("SELECT * FROM users WHERE SSN=@SSN;").get({SSN});
    
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
});

app.post("/api/addPosts", authenticate, (req, res) => {

    const reqbody = req.body;

    const insert = db.prepare('INSERT INTO products VALUES (@id, @title, @image, @price, @description, @rating);');

    const insertMany = db.transaction((reqbody) => {
        for (const x of reqbody) insert.run(x);
    });

    insertMany(reqbody);
    
    res.json({status: "inserted successfully"});
});

app.get("/api/getAll", authenticate, (req, res) =>
{
    const rows = db.prepare("select * from products;").all();
    res.json(rows);
})

app.post("/api/getProductDescription", (req, res) => {

});

// app.post("/api/insert", (req, res) =>{

//     const x = req.body;
//     // console.log(x); 
//     const row = db.prepare("insert into products values INSERT INTO products VALUES (@id, @title, @image, @price, @description, @rate);");
//     row.run(x);
// });