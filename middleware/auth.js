const JWT = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).send({ success: false, message: "Authentication token is missing" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).send({ success: false, message: "Authentication token is missing" });
    }

    JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({ success: false, message: "Unauthorized User" });
      }
      req.user = decoded; 
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Server error", error });
  }
};



































// const JWT = require("jsonwebtoken");

// module.exports = async (req, res, next) => {
//   try {
   
//     const token = req.headers["authorization"].split(" ")[1];
//     JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
//       if (err) {
//         return res.status(401).send({success: false,message: "Un-Authorize User"});
//       } else {
//         req.body.id = decode.id;
//         next();
//       }
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({success: false,message: "Please provide Auth Token",error});
//   }
// };
// const admin = (req, res, next) => {
//   if (req.user && req.user.isAdmin) {
//       next();
//   } else {
//       res.status(401).json({status:401, message: 'Not authorized as an admin' });
//   }
// };
// module.exports = { admin };
