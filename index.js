
const express = require('express');
const path = require('path');
const cors=require('cors');
var mongodb=require("mongodb");
var MongoClient=mongodb.MongoClient;
var url="mongodb+srv://honey:hani@143@cluster0.f15hv.mongodb.net/formdata?retryWrites=true&w=majority";
const app = express();
const PORT = process.env.PORT || 8080; // Step 1


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
// Step 3

app.get("/",(req,res)=>{
    MongoClient.connect(url, function(err, client) {
        if(err) {
             console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
        }
        console.log('Connected...');
        const collection = client.db("formdata").collection("form");
        // perform actions on the collection object
        client.close();
     });
    res.json({message:"Hello World"});
})





app.listen(PORT, console.log(`Server is starting at ${PORT}`));