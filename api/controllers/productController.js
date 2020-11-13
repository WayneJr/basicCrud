const Product   = require('../../models/product');
const Category  = require('../../models/category');
const jwt       = require('jsonwebtoken');

module.exports = {
    root: function(req, res, next) {
        Product.find({})
            .then(products => res.json(products))
            .catch(err => console.log(err));
    },
    new: function(req, res, next) {
        jwt.verify(req.token, "thesecret", (err, user) => {
            if (err) {
                return res.sendStatus(403);
            } else {
                req.user = user;
            }
        });
        if (req.user.name.role != 'admin') {
            return res.sendStatus(403);
        } else {
            Category.find({})
                .then(categories => res.render('product/new', {categories: categories}))
                .catch(err => console.log(err));
        }
    },
    createProduct: function(req, res, next) {
        jwt.verify(req.token, "thesecret", (err, user) => {
            if (err) {
                return res.sendStatus(403);
            } else {
                req.user = user;
            }
        });
        if (req.user.name.role != 'admin') {
            return res.sendStatus(403);
        } else {
            // console.log(req.body.category);
            // req.body.product.category = {id: req.body.category._id, name: req.body.category.name};
            // console.log(req.body.product.category);
            Product.create(req.body.product)
                .then(() => res.send('successfully added product'))
                .catch(err => console.log(err));
        }
    },
    show: function(req, res, next) {
        Product.findById(req.params.id)
            .then(product => res.json(product))
            .catch(err => console.log(err));
    },
    edit: function(req, res, next) {
        jwt.verify(req.token, "thesecret", (err, user) => {
            if (err) {
                return res.sendStatus(403);
            } else {
                req.user = user;
            }
        });
        if (req.user.name.role != 'admin') {
            return res.sendStatus(403);
        } else {
            Category.find({})
                .then(categories => {
                    Product.findById(req.params.id)
                        .then(product => res.render('product/edit', {product: product, categories: categories}))
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        }

    },
    update: function(req, res, next) {
        jwt.verify(req.token, "thesecret", (err, user) => {
            if (err) {
                return res.sendStatus(403);
            } else {
                req.user = user;
            }
        });
        if (req.user.name.role != 'admin') {
            return res.sendStatus(403);
        } else {
            Product.findByIdAndUpdate(req.params.id, req.body.category)
                .then(() => res.redirect('/products/' + req.params.id))
                .catch(err => console.log(err));
        }
    },
    delete: function(req, res, next) {
        jwt.verify(req.token, "thesecret", (err, user) => {
            if (err) {
                return res.sendStatus(403);
            } else {
                req.user = user;
            }
        });
        if (req.user.name.role != 'admin') {
            return res.sendStatus(403);
        } else {
            Product.findByIdAndDelete(req.params.id)
                .then(() => res.redirect('/products'))
                .catch(err => console.log(err));
        }
    }
}

