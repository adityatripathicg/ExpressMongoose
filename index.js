const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Chat = require("./models/chat.js");
let port = 8080;

main().then(()=>{
    console.log("Connection Successful");
})
.catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
};

let chat1 = new Chat({
    from : "CG",
    to : "SCG",
    msg : "Hello SCG",
    created_at : new Date(),
});
chat1.save().then((res)=>console.log(res))
.catch((err)=>console.log(err));
app.set("views", path.join(__dirname,"views"));
app.set("view engine", "ejs");

app.get("/",(req,res)=>{
    res.send("Root Directory Working");
});

app.listen(port,()=>{
    console.log("App Listening to", port);
})