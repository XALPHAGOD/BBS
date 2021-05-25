const mongoose= require("mongoose");
const db= "mongodb+srv://XALPHAGOD:Rockstar@2000@bbs.f6eas.mongodb.net/bank?retryWrites=true&w=majority";

mongoose.connect(db || "mongodb://localhost:27017/bank", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log("DB: Connected");
})
.catch((err)=>{
    console.log("DB:", err);
});