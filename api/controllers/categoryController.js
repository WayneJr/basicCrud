const Category = require('../../models/category');

module.exports = {
    root: function(req, res, next) {
        res.send('this is from the controller');
    },
    new: function(req, res, next) {
        res.render('category/new');
    },
    createCategory: function(req, res, next) {
        Category.create(req.body.category)
            .then(category => res.send('successfully added category'))
            .catch(err => console.log(err));
    }

}
