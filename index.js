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
const methodOverride = require("method-override");
app.use(methodOverride("_method"));


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
    //console.log(chats);
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

//Edit Route
app.get("/chats/:id/edit/",async (req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", {chat});
});

//Update Route
app.put("/chats/:id",async (req,res)=>{
    let {id} = req.params;
    let {msg : newmsg} = req.body;
    let updatechat = await Chat.findByIdAndUpdate(id, {msg : newmsg}, {runValidators:true}, {new:true});
    console.log("Updated");
    res.redirect("/chats");
});

//Destroy Route
app.delete("/chats/:id",async (req,res)=>{
    let {id} = req.params;
    let deletedchat = await Chat.findByIdAndDelete(id);
    console.log(deletedchat);
    res.redirect("/chats");
});

app.get("/",(req,res)=>{
    res.send("Root Directory Working");
});

app.listen(port,()=>{
    console.log("App Listening to", port);
})