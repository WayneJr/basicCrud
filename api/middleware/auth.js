const jwt = require('jsonwebtoken');
const Admin = require('../../models/admin');

// module.exports = function(req, res, next) {
    // const token = req.headers['authorization'];
    // if (!token) return res.status(401).json({ message: "Auth Error" });
    // try {
    //
    //     const decoded = jwt.verify(token, "randomString");
    //     req.user = decoded.user;
    //     // Admin.findOne({decoded.user.username})
    //     //     .then()
    //     console.log(req.user);
    //     next();
    // } catch (e) {
    //     console.error(e);
    //     res.status(500).send({ message: "Invalid Token" });
    // }


// };

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log(req.headers);
    if (typeof authHeader !== 'undefined') {
        const token = authHeader.split(' ')[1];
        req.token = token;
        console.log(req.token);
        next();

    } else {
        res.sendStatus(401);
    }
};
