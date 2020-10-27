const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: String,
    description: String,
    products: [{
        type: mongoose.Schema.Types.ObjectID,
        ref: "Product"
    }]
});

module.exports = mongoose.model('Category', categorySchema);
