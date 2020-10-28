const Product = require('../../models/product');
const Category = require('../../models/category');

module.exports = {
    root: function(req, res, next) {
        Product.find({})
            .then(products => res.json(products))
            .catch(err => console.log(err));
    },
    new: function(req, res, next) {
        Category.find({})
            .then(categories => res.render('product/new', {categories: categories}))
            .catch(err => console.log(err));
    },
    createProduct: function(req, res, next) {
        Product.create(req.body.product)
            .then(() => res.send('successfully added product'))
            .catch(err => console.log(err));
    },
    show: function(req, res, next) {
        Product.findById(req.params.id)
            .then(product => res.json(product))
            .catch(err => console.log(err));
    },
    edit: function(req, res, next) {
        Category.find({})
            .then(categories => {
                Product.findById(req.params.id)
                    .then(product => res.render('product/edit', {product: product, categories: categories}))
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));

    },
    update: function(req, res, next) {
        Product.findByIdAndUpdate(req.params.id, req.body.category)
            .then(() => res.redirect('/products/' + req.params.id))
            .catch(err => console.log(err));
    },
    delete: function(req, res, next) {
        Product.findByIdAndDelete(req.params.id)
            .then(() => res.redirect('/products'))
            .catch(err => console.log(err));
    }
}

