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

    JWT.verify(token, process.env.JWT_SECRET_DeliveryMan, (err, decoded) => {
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
