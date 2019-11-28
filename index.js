var express = require("express");
var app = express();
var empsRouter = require("./routes/emp");
var config = require("config");

var port = config.get("port");

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use("/emps",empsRouter);

app.listen(port,()=>{
    console.log("SERVER STARTED!!!!");
})
