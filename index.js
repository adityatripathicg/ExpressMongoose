const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Chat = require("./models/chat.js");
let port = 8080;
app.set("views", path.join(__dirname,"views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));

main().then(()=>{
    console.log("Connection Successful");
})
.catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
};

//Index Route
app.get("/chats", async(req,res)=>{
    let chats = await Chat.find();
    console.log(chats);
    res.render("index.ejs", {chats});
});
//New Route
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
});
//Create Route
app.post("/chats",(req,res)=>{
    let {from,to,msg} = req.body;
    let newchat = new Chat({
        from : from,
        to : to,
        msg : msg,
    });
    newchat.save().then(()=>{
        console.log("New Chat was saved!");
    })
    .catch((err)=>{
        console.log(err);
    });
    res.redirect("/chats");
});

app.get("/",(req,res)=>{
    res.send("Root Directory Working");
});

app.listen(port,()=>{
    console.log("App Listening to", port);
})