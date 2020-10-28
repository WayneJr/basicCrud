const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: String,
    category: {
        id: {
            type: mongoose.Schema.Types.ObjectID,
            ref: "Category"
        },
        name: String
    }
});

module.exports = mongoose.model('Product', productSchema);
