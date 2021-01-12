const mongoose = require("mongoose");
const { Schema } = mongoose;

const Book = require("./book");

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    full_name: String,
    address: String,
    phone_number: String,
    // salt: String,
    // isBlocked: {
    //     type: Boolean,
    //     default: false
    // },
    show: {
        type: Boolean,
        default: true
    },
    status: {
        type: String,
        default: "Pending"
    },
    cart: [
        {
            bookId: {
                type: mongoose.Types.ObjectId,
                ref: Book
            },
            count: {
                type: Number,
                default: 0
            }
        }
    ],
});

module.exports = mongoose.model("User", UserSchema);
