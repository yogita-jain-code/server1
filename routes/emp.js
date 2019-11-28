var express = require("express");
var router = express();

var mysql = require("mysql");
var Joi = require("joi");
var config = require("config");


var connection = mysql.createConnection({
    host : config.get("host"),
    database : config.get("database"),
    user : config.get("user"),
    password : config.get("password")

});

connection.connect();
router.use(express.json());

router.get("/",(request,response)=>{

    var queryText = "SELECT * FROM emp";

    connection.query(queryText,(err,result)=>{
        if(err == null)
        {
            console.log("SELEC IS DONE!!");
            response.send(JSON.stringify(result));
        }
        else
        {
            console.log(err);
            response.send(JSON.stringify(err));
        }
    })
})


router.get("/:No",(request,response)=>{
  var No = request.params.No;

  var queryText = `SELECT * FROM emp WHERE No = ${No}`;

  connection.query(queryText,(err,result)=>{
    if(err == null)
    {
        console.log("SELECTIVE SELECT IS DONE!!!!");
        response.send(JSON.stringify(result));
    }
    else
    {

        console.log(err);
        response.send(JSON.stringify(err));
    }


  })

})

router.post("/",(request,response)=>{

var ValidateResult = Validate(request);
if(ValidateResult.error == null)
{

    var No = request.body.No;
    var Name = request.body.Name;
    var Age = request.body.Age;

    var queryText = `INSERT INTO emp VALUES(${No},'${Name}',${Age})`;
    connection.query(queryText,(err,result)=>{
        if(err== null)
        {
            console.log("INSERT IS DONE");
            response.send(JSON.stringify(result));
        }
        else
        {
            console.log(err);
            response.send(JSON.stringify(err));
        }
    })

}
else
{
    response.send(JSON.stringify(ValidateResult.error));
}

})


function Validate(request)
{
    var ValidateSchema =
    {
        No : Joi.number().required(),
        Name : Joi.string().required(),
        Age : Joi.number().min(16).max(70).required()

    }

    return Joi.validate(request.body , ValidateSchema);
}


router.put("/:No",(request,response)=>{
   var No = request.params.No;

   var Name = request.body.Name;
   var Age = request.body.Age;

   var queryText = `UPDATE emp SET Name= "${Name}" , Age =${Age} WHERE No = ${No}`;
   connection.query(queryText,(err,result)=>{
       if(err == null)
       {
           console.log("UPDATE IS DONE!!!!");
           response.send(JSON.stringify(result));
       }
       else
       {
           console.log(err);
           response.send(JSON.stringify(err));
       }
   })


});

router.delete("/:No",(request,response)=>{

 var No = request.params.No;

 var queryText = `DELETE FROM emp WHERE No = ${No}`;
 connection.query(queryText,(err,result)=>{

    if(err == null)
    {
      console.log("DELETE IS DONE");
      response.send(JSON.stringify(result));

    }
    else
    {
        console.log(err);
        response.send(JSON.stringify(err));
    }
 })





})




module.exports = router;