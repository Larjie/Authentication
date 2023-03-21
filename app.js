//jshint esversion:6
require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));



mongoose.connect("mongodb://localhost:27017/userDB");

const userSchema = new mongoose.Schema(
    {
        email: String,
        password: String
    }
);

const secret = process.env.SECRET;
userSchema.plugin(encrypt, {secret: secret, encryptedFields: ['password']} );

const user = mongoose.model("user", userSchema);



app.get("/", function(req, res){
    res.render("home");
});

app.get("/login", function(req, res){
    res.render("login");
});

app.get("/logout", function(req, res){
res.render("home");
});

app.get("/register", function(req, res){
    res.render("register");
});

app.get("/submit", function(req, res){
    res.render("submit");
});

app.post("/register",  function(req, res){
    const user1 = new user({
        email: req.body.username,
        password: req.body.password
    });
    user1.save().then(function(result){
        console.log(result);
        res.render("secrets");
    });
});

app.post("/login", function(req, res){
const username = req.body.username;
const password = req.body.password;
user.findOne({email: username}).then(function(result){
    if(!result){
        res.send("Stay out, Outsider!>:d");
    } else {
        if(result.password === password){
            res.render("secrets");
            console.log(result.password);
        };
    };
});
});


app.listen(3000, function(){
console.log("Started listening on port 3000")
});