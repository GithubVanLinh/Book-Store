const mongoose = require("mongoose");
const { Schema } = mongoose;

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
    show: {
      type: Boolean,
      default: true
    }
});

module.exports = mongoose.model("User", UserSchema);
