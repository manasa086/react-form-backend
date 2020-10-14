var PORT=process.env.PORT || 3001;
var express = require('express');
var mongodb=require("mongodb");
var app=express();
var mongoClient=mongodb.MongoClient;
var url="mongodb://localhost:27017";
var dbname="formdata";
var cors = require("cors");

app.use(cors())

app.use(express.json());

app.get("/",async function(req,res){
    let client;
    try
    {
    client= await mongoClient.connect(url);
    let db=client.db(dbname);
    client.close();
    res.send("Hello World")
    }
    catch(error)
    {
        if(client)
            client.close();
        console.log(error);
      
    }    

})

app.listen(PORT);