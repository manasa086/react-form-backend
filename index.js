
const express = require('express');
const path = require('path');
const cors=require('cors');
var mongodb=require("mongodb");
var MongoClient=mongodb.MongoClient;
var url="mongodb+srv://honey:hani@143@cluster0.f15hv.mongodb.net/?retryWrites=true&w=majority";
const app = express();
const PORT = process.env.PORT || 8080; // Step 1
var dbname="formdata";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
// Step 3

app.get("/",(req,res)=>{
    MongoClient.connect(url, function(err, client) {
        if(err) {
             console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
        }
        var db=client.db(dbname);
        var cursor=db.collection("form").find().toArray();
        cursor.then(function(data)
        {
            console.log(data);
            client.close();
            res.json({message:data});
        })

     });
})

app.get("/editdelete/:id",(req,res)=>{
    MongoClient.connect(url,function(err,client)
    {
        if(err)
        {
            console.log('Error occurred while connecting to MongoDB Atlas....\n',err);
            
        }
         var db=client.db(dbname);
        var cursor=db.collection("form").find({dataid:Number(req.params.id)}).toArray();
        cursor.then(function(data)
        {
            res.json({message:data});
        }) 

    })
})
app.put("/update",(req,res)=>{
    MongoClient.connect(url,function(err,client)
    {
        if(err)
        {
            console.log('Error occurred while coonecting to MongoDB Atlas ....\n',err)
        }
        var db=client.db(dbname);
        console.log(req.body)
        db.collection("form").findOneAndUpdate({dataid:req.body.dataid},{$set:{"name":req.body.name,"email":req.body.email,"address":req.body.address,"address2":req.body.address2,"gender":req.body.gender,"martialstatus":req.body.martialstatus,"food":req.body.food,"color":req.body.color}},
        function(err,data)
        {
            if(err)
                console.log(err);
            client.close();
            res.json({message:"data updated"})
        });
        // res.json({message:"data updated"})
    });
})
app.delete("/delete",(req,res)=>{
    MongoClient.connect(url,function(err,client)
    {
        if(err)
        {
            console.log('Error occurred while coonecting to MongoDB Atlas ....\n',err)
        }
        var db=client.db(dbname);
        db.collection("form").deleteOne({dataid:req.body.dataid},
        function(err,data)
        {
            if(err)
                console.log(err);
            client.close();
            res.json({message:"data deleted"})
        });
    });
})
app.post("/",(req,res)=>{
    MongoClient.connect(url, function(err, client) {
        if(err) {
             console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
        }
        var db = client.db(dbname);
        var cursor=db.collection("form").find().toArray();
        cursor.then(function(data)
        {
           // console.log(data.length);
            req.body.dataid=(data.length+1);
            db.collection("form").insertOne(req.body,function(err,data)
            {
                if(err)
                    console.log("Not inserted in to database");
                client.close();
                res.json({message:"data inserted"});
            });
        })
        
        // perform actions on the collection object
        
     });
    
})





app.listen(PORT, console.log(`Server is starting at ${PORT}`));