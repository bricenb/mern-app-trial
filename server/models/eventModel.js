const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    name: {type: String, required: true},
    time: {type: String, required: true},
    location: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true}
}, {
    timestamps: true
});

const Customer = mongoose.model("customer", customerSchema);

module.exports = Customer;
