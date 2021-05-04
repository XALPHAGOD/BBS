const mongoose= require("mongoose");

mongoose.connect("mongodb+srv://XALPHAGOD:Rockstar@2000@bbs.f6eas.mongodb.net/bank?retryWrites=true&w=majority" || "mongodb://localhost:27017/bank", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log("DB: Connected");
})
.catch((err)=>{
    console.log("DB: Error", err);
});