var express = require('express');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'my_db'
})


connection.connect(function(err){
    if(err){
        throw err;
    }
    console.log("Mysql connected !!!");
})

var app = express();
app.get('/',function(req,res){
    res.end('hello from root url');
})
app.get('/create_db',function(req,res){
    let sql = 'CREATE DATABASE my_db';
    connection.query(sql,function(err,result){
        if(err){
            throw err;
        }
        console.log(result);
        res.send("databse created !!!")

    });
});


app.get('/createTable',function(req,res){
    let sql= 'CREATE TABLE Persons ( PersonID int AUTO_INCREMENT,FirstName varchar(255), LastName varchar(255), PRIMARY KEY(PersonID))';
    connection.query(sql,function(err,result){

        if(err){
            throw err;
        }
        console.log(result);
        res.send("Table has been created !!");
    });
});


app.get('/insertTable/',function(req,res){
    let sql= 'INSERT INTO Persons SET ?'; // this question mark will work like place holder;
    let insert = {FirstName : req.query.FirstName,LastName : req.query.LastName};
    connection.query(sql,insert,function(err,result){

        if(err){
            throw err;
        }
        console.log(result);
        res.send("one row has been inserted !!");
    });
});

app.listen(3000,'localhost',()=>{
    console.log("listening on port 3000");
})