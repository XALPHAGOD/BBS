const express= require("express");
const path= require("path");
const hbs= require("hbs");
const bcrypt= require("bcryptjs");

const port= process.env.PORT || 3000;
require("./src/database/connection");
const Customer= require("./src/models/customers");
const Transaction= require("./src/models/transactions");

const publicPath= path.join(__dirname, "./public");
const viewsPath= path.join(__dirname, "./templates/views");
const partialsPath= path.join(__dirname, "./templates/partials");

const app= express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(publicPath));
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

app.get("/", (req, res)=>{
    res.render("home");
});

app.get("/customers", async (req, res)=>{
    try {
        const allCust= await Customer.find({});
        res.render("customers", {allCust});
    } catch (err) {
        res.render("error", {err, message: null});
    }
});

app.get("/customers/:id", async (req, res)=>{
    try {
        await Customer.findById(req.params.id)
        .populate("transactions")
        .exec((err, user)=>{res.render("custDetails", {user})});
    } catch (err) {
        res.render("error", {err, message: null});
    }
});

app.get("/transfer/:id", async (req, res)=>{
    try {
        const user= await Customer.findById(req.params.id);
        const allUsers= (await Customer.find({})).filter((each)=>each._id!=req.params.id);
        res.render("transfer", {user, allUsers});
    } catch (err) {
        res.render("error", {err, message: null});
    }
});

app.post("/transfer", async (req, res)=>{
    try {
        const from= await Customer.findById(req.body.from);
        const to= await Customer.findById(req.body.to);
        const amount= req.body.amount;
        if(amount==='')
            res.render("error", {err: null, message: "Invalid Amount/ Amount Cannot Be 0"});
        if(amount<=from.balance){
            const newTrnsc= new Transaction({
                amount: amount,
                from: from.username,
                to: to.username
            });
            const saveTrnsc= await newTrnsc.save();

            from.balance=(from.balance)-(amount);
            to.balance=(parseFloat(to.balance)+parseFloat(amount));

            from.transactions.push(newTrnsc);
            to.transactions.push(newTrnsc);

            await from.save();
            await to.save();
            res.render("success", {trnsc: saveTrnsc});
        }
        else
            res.render("error", {error: null, message: "Insufficient Balance"});
    } catch (err) {
        res.render("error", {err, message: null});
    }
});

app.get("/history", async (req, res)=>{
    try {
        const allTrnsc= await Transaction.find({});
        res.render("history", {allTrnsc});
    } catch (err) {
        res.render("error", {err, message: null});
    }
});

app.post("/register", async (req, res)=>{
    try{
        const hashedPassword= await bcrypt.hash(req.body.password, 10);
        const regUser= new Customer({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            hashedPassword: hashedPassword,
            balance: req.body.balance
        })
        await regUser.save();
        res.redirect("home");
    }catch(err){
        res.render("error", {err: null, message: "Invalid User Credentials, All Fields are Mandatory, Email should be Unique"});   
    }
});

app.all("*", (req, res)=>{
    res.render("home");
});

app.listen(port, ()=>console.log(`PORT: ${port}`)); 