const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        author: {
            type: String,
            required: true,
            trim: true
        },

        isbn: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        category: {
            type: String,
            required: true,
            trim: true
        },

        publisher: {
            type: String,
            trim: true
        },

        publishedYear: {
            type: Number
        },

        quantity: {
            type: Number,
            required: true,
            min: 0
        },

        availableQuantity: {
            type: Number,
            required: true,
            min: 0
        },

        description: {
            type: String,
            trim: true
        },

        coverImage: {
            type: String,
            trim: true
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Book", bookSchema);