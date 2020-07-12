// note in order to install all dependencies mentioned in package.json, do run on cli "npm install"
// used nodemon inorder to make change on brower when edit on code. No need to restart the server
/* express is the easy and flexible routing system
   - it integrate with many template engine
   -contain a middleware framework

*/

var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
/*
app.get(route,fn)
app.post(route,fn)
app.delete(route,fn)
*/

// middle ware and static files

app.set('view engine','ejs');
app.get('/',function(req,res){
    res.sendFile(__dirname+'/template/index.html');
});

// query string
//  http://localhost:8888/contact?dept=pay&name=sachin
app.get('/contact',function(req,res){
    console.log(req.query);
    res.render("contact",{qs:req.query});
})

app.post('/contact',urlencodedParser,function(req,res){
    console.log(req.body);
    res.render("contact_success",{data:req.body});
})


app.get('/profile/:name',function(req,res){
    data = {age:22,job:'SDE-Intern',hobbies:['fishing','eating']}
    res.render("profile",{person: req.params.name,data});
})
app.listen(8888);