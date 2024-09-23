const admin = require("../models/admin");
const vendor = require("../models/vendor");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

// REGISTER
const adminRegister = async(req,res) => {
  const {userName,email,password, role} = req.body;
  try{
    const existingAdmin = await admin.findOne({email});
    if(existingAdmin){
      return res.status(400).json({msg: "Admin already exists"});
    } 
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);
    const newAdmin = new admin({userName,email,password:hashedPassword, role});
    const payload = { id: newAdmin._id, role: newAdmin.role};
    const token = JWT.sign(payload, process.env.JWT_SECRET_ADMIN, { expiresIn: '1d' });
    await newAdmin.save();
    res.json({status:201, msg:"Admin created successfully", data :newAdmin,token});

  }catch(error){
    console.error(error);
    return res.status(500).json({msg:"Server error"});
  }
}

const loginAdmin = async(req,res) => {
    
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).send({success: false,message: "Please Provide Email OR Password"});
    }
    const Admin = await admin.findOne({ email });
    if (!Admin) {
      return res.status(404).send({success: false,message: "ADMIN Not Found"});
    }
    const isMatch = await bcrypt.compare(password, Admin.password);
    if (!isMatch) {
      return res.status(500).send({success: false, message: "Invalid Credentials"});
    }
    const token = JWT.sign({ id: Admin._id , role: admin.role}, process.env.JWT_SECRET_ADMIN, {
      expiresIn: "7d",
    });
    Admin.password = undefined;
    res.status(200).send({success: true, message: "Login Successfully",data : Admin,token});
  } catch (error) {
    console.log(error);
    res.status(500).send({success: false, message: "Error In Login API",error});
  }
};

const vendorRegistration = async (req, res) => {
  try {
    const { vendorName, email, password, } = req.body;
    console.log(req.body)

    if (!vendorName || !email || !password ) {
      return res.status(500).send({success: false,message: "Please Provide All Fields" });
    }
    const exisiting = await vendor.findOne({ email });
    if (exisiting) {
      return res.status(500).send({success: false,message: "Email Already Registerd please Login"});
    }
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const Vendor = await vendor.create({
      vendorName,
      email,
      password: hashedPassword,
     
    });
    
    return res.status(201).send({success: true,message: "Successfully Registered",Vendor});
  } catch (error) {
    console.log(error);
    res.status(500).send({success: false,message: "Error In Register API",error});
  }
};

const acceptVendor = async(req, res)=>{
  try{
    const Vendor = await vendor.findById(req.body.id);
    if(!Vendor){
      return res.status(404).send({success: false,message: "Vendor Not Found"});
  }
  Vendor.status = 'accepted';
  const vendorStatus = await Vendor.save();
  res.status(200).send({success: true,message: "Vendor Accepted Successfully", data:vendorStatus});
}catch(err){
  console.log(err);
  res.status(400).send({success: "false", message:"error", err});
}
};

// const rejectVendor = async (req,res)=>{
//   try{
//     const Vendor = await vendor.findById(req.body.id);
//     if(!Vendor){
//       return res.status(404).send({success: false,message: "Vendor Not Found"});
//   }
//   Vendor.status = 'rejected';
//   const vendorStatus = await Vendor.save();
//   res.status(200).send({success: true,message: "Vendor Rejected Successfully", data:vendorStatus})
// }catch(err){
//   console.log(err);
//   res.status(400).send({success: "false", message:"error", err});
// }
// };

const updateVendorStatus = async (req,res)=> {
  const {id , status} = req.body;
  if(!['accepted','rejected','pending'].includes(status)){
    return res.status(400).send({success: false,message: "Invalid Status"});
  }
  try{
    const Vendor = await vendor.findById(req.body.id);
    if(!Vendor){
      return res.status(404).send({success: false,message: "Vendor Not Found"});
  }
  Vendor.status = status;
  const vendorStatus = await Vendor.save();
  res.status(200).send({success: true,message: "Vendor status updated Successfully", data:vendorStatus})
}catch(err){
  console.log(err);
  res.status(400).send({success: "false", message:"error", err});
}
};


module.exports = {acceptVendor, vendorRegistration ,adminRegister, loginAdmin, updateVendorStatus};
