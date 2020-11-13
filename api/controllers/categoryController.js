const Category = require('../../models/category');
const jwt = require('jsonwebtoken');
// const authAdmin = require('../middleware/adminAuth');

module.exports = {
    root: function(req, res, next) {
        Category.find({})
            .then(categories => res.render('category/index', {categories: categories}))
            // .then(categories => res.json(categories))
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
            res.render('category/new');
        }
        
    },
    createCategory: function(req, res, next) {
        jwt.verify(req.token, "thesecret", (err, user) => {
            if (err) {
                return res.sendStatus(403);
            } else {
                // res.render('category/new');
                req.user = user;
            }
        });

        if (req.user.name.role != 'admin') {
            return res.sendStatus(403);
        } else {
            Category.create(req.body.category)
            .then(category => res.send('successfully added category'))
            .catch(err => console.log(err));
        }
    },
    show: function(req, res, next) {
        Category.findById(req.params.id)
            .then(category => res.json(category))
            .catch(err => console.log(err));
    },
    edit: function(req, res, next) {
        jwt.verify(req.token, "thesecret", (err, user) => {
            if (err) {
                return res.sendStatus(403);
            } else {
                // res.render('category/new');
                req.user = user;
            }
        });

        if (req.user.name.role != 'admin') {
            return res.sendStatus(403);
        } else {
            Category.findById(req.params.id)
            .then(category => res.render('category/edit', {category: category}))
            .catch(err => console.log(err));
        }
        
    },
    update: function(req, res, next) {
        jwt.verify(req.token, "thesecret", (err, user) => {
            if (err) {
                return res.sendStatus(403);
            } else {
                res.render('category/new');
                req.user = user;
            }
        });

        if (req.user.name.role != 'admin') {
            return res.sendStatus(403);
        } else {
            Category.findByIdAndUpdate(req.params.id, req.body.category)
                .then(() => res.redirect('/categories/' + req.params.id))
                .catch(err => console.log(err));
        }
        
    },
    delete: function(req, res, next) {
        jwt.verify(req.token, "thesecret", (err, user) => {
            if (err) {
                return res.sendStatus(403);
            } else {
                res.render('category/new');
                req.user = user;
            }
        });

        if (req.user.name.role != 'admin') {
            return res.sendStatus(403);
        } else {
            Category.findByIdAndDelete(req.params.id)
            .then(() => res.redirect('/categories'))
            .catch(err => console.log(err));
        }
        
    }
}
