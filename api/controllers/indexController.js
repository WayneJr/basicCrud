const User = require('../../models/user');
const Admin = require('../../models/admin');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function register(model, req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {username, password} = req.body;
    try {
        let name = await model.findOne({username});
        if (name) {
            return res.status(400).json({msg: `${model.modelName} doesn't exist`});
        }
        name = new model({username, password});
        const salt = await bcrypt.genSalt(10);
        name.password = await bcrypt.hash(password, salt);

        await name.save();
        const payload = {
            name: {
                id: name.id
            }
        };

        jwt.sign(payload, "meatandfish", {expiresIn: 10000}, (err, token) => {
            if (err) throw err;
            res.status(200).json({token});
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Error In saving");
    }
}
async function login(model, req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {username, password} = req.body;
    try {
        let name = await model.findOne({username});
        if (!name) return res.status(400).json({message: `${model.modelName} doesn't exist`});
        const isMatch = await bcrypt.compare(password, name.password);
        if (!isMatch) return res.status(400).json({message: 'Incorrect Password'});
        const payload = {
            name: {
                id: name.id
            }
        };

        jwt.sign(payload, "fishandmeat", {expiresIn: 3600}, (err, token) => {
            if (err) throw err;
            res.status(200).json({token});
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Server Error"});
    }
}

module.exports = {
    root: function(req, res, next) {
        res.send('<h1>Welcome to the ecommerce api</h1>')
    },
    showUserRegister: function(req, res, next) {
        res.render('register');
    },
    userRegister: async function(req, res, next) {
        register(User, req, res, next)
            .then(() => console.log('done'));
    },
    showUserLogin: function(req, res, next) {
        res.render('login');
    },
    userLogin: async function(req, res, next) {
        login(User, req, res, next)
            .then(() => console.log('user logged in'));
    },

    showAdmin: function(req, res, next) {
        res.render('admin');
    },

    adminRegister: async function(req, res, next) {
        register(Admin, req, res, next)
            .then(() => console.log('admin added'));
    },
    adminLogin: async function(req, res, next) {
        login(Admin, req, res, next)
            .then(() => console.log('admin loggged in'));
    }
}
