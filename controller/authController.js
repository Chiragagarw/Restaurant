const userModel = require("../models/user");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

// REGISTER
const registerController = async (req, res) => {
  try {
    const { userName, email, password, birthDate, phone, address , profileImage, location} = req.body;
    console.log(req.body)

    if (!userName || !email || !password || !birthDate || !address || !phone || !profileImage || !location) {
      return res.status(500).send({success: false,message: "Please Provide All Fields" });
    }
    const exisiting = await userModel.findOne({ email });
    if (exisiting) {
      return res.status(500).send({success: false,message: "Email Already Registerd please Login"});
    }
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
 
    const user = await userModel.create({
      userName,
      email,
      password: hashedPassword,
      birthDate,
      address,
      phone,
      profileImage,
      location,
    });
    const payload = { id: user._id, password };  
    const token = JWT.sign(payload, process.env.JWT_SECRET, { expiresIn: '9d' });
    await user.save();
    
    res.status(201).send({success: true,message: "Successfully Registered",data:user,token});
  } catch (error) {
    console.log(error);
    res.status(500).send({success: false,message: "Error In Register API",error});
  }
};

// LOGIN
const loginController = async (req, res) => {
  try {
    // console.log("hello");
    const { email, password } = req.body;
    console.log(req.body);
    if (!email || !password) {
      return res.status(500).send({success: false,message: "Please PRovide EMail OR Password"});
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({success: false,message: "User Not Found"});
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).send({success: false, message: "Invalid Credentials"});
    }
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn: "7d"});
    user.password = undefined;
    res.status(200).send({success: true, message: "Login Successfully",data:user,token});
  } catch (error) {
    console.log(error);
    res.status(500).send({success: false, message: "Error In Login API",error});
  }
};

module.exports = { registerController, loginController };