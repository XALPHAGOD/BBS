const mongoose= require("mongoose");

const transactionSchema= new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

const Transaction= mongoose.model("Transaction", transactionSchema);

module.exports= Transaction;