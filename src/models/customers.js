const mongoose= require("mongoose");
const Transaction= require("./transactions");

const customerSchema= new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Transaction
    }]
});

const Customer= mongoose.model("Customer", customerSchema);

module.exports= Customer;