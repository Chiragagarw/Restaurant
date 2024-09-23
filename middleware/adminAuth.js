const jwt = require('jsonwebtoken');

// function admin(req, res, next) {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];
//   if (token == null) return res.sendStatus(401);

//   jwt.verify(token, process.env.JWT_SECRET_ADMIN, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// }

// module.exports = { admin };


const admin = async (req, res, next) => {
  
    const authHeader = req.header('Authorization');

    if (!authHeader || !(token = authHeader.replace('Bearer ', ''))) {
        return res.status(401).json({ status: 401, message: 'Token is required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_ADMIN);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ status: 401, message: 'Token is not valid' });
    }
};
const subAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).json({status:401, message: 'Not authorized as an admin' });
    }
};
module.exports = { admin, subAdmin };

