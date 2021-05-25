const mongoose= require("mongoose");

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
        ref: "Transaction"      //tells which collection to look into
    }]
});

const Customer= mongoose.model("Customer", customerSchema);

module.exports= Customer;