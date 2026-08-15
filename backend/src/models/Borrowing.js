const mongoose = require("mongoose");

const borrowingSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
            required: true
        },

        borrowDate: {
            type: Date,
            default: Date.now
        },

        dueDate: {
            type: Date,
            required: true
        },

        returnDate: {
            type: Date,
            default: null
        },

        status: {
            type: String,
            enum: ["BORROWED", "RETURNED", "OVERDUE"],
            default: "BORROWED"
        },

        fine: {
            type: Number,
            default: 0,
            min: 0
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Borrowing", borrowingSchema);