const mongoose = require('mongoose');
const Chat = require("./models/chat.js");


main().then(()=>{
    console.log("Connection Successful");
})
.catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
};

let allChats = [
    {
    from : "CG",
    to : "SCG",
    msg : "Name Few Avengers",
    created_at : new Date(),
    },
    {
        from : "SCG",
        to : "CG",
        msg : "Tony Stark",
        created_at : new Date(),
    },
    {
        from : "SCG",
        to : "CG",
        msg : "Peter Parker",
        created_at : new Date(),
    },
    {
        from : "SCG",
        to : "CG",
        msg : "Steve Rogers",
        created_at : new Date(),
    },
];

Chat.insertMany(allChats);