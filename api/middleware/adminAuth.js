const jwt = require('jsonwebtoken');
const auth = require('./auth');
module.exports = (token, req, res, next) => {
    auth(req, res, next);
    jwt.verify(token, 'thekey', (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            next()
        }
    });
}
