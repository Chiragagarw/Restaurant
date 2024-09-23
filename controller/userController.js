const userModel = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/nodemailer');


// GET USER 
exports.getUserController = async (req, res) => {
    try {
      const user = await userModel.findById({ _id: req.body.id });
      if (!user) {
        return res.status(404).send({success: false,message: "User Not Found"});
      }
      user.password = undefined;
      
      res.status(200).send({success: true, message: "User get Successfully", user});
    } catch (error) {
      console.log(error);
        res.status(500).send({success: false,message: "Eror in Get User API", error});
    }
  },
  // get all user
  exports.getAllUserController = async (req, res) => {
    try {
      const user = await userModel.find();
      if (!user) {
        return res.status(404).send({success: false,message: "User Not Found"});
      }
      res.status(200).send({success: true, message: "User get Successfully", user})
    
    }catch(err){
      console.log(err);
      res.status(500).send({success: false,message: "Eror in Get User API"})
    }
  }
  
  // UPDATE USER
  exports.updateUserController = async (req, res) => {
    try {
      const user = await userModel.findById({ _id: req.body.id });
      if (!user) {
        return res.status(404).send({success: false,message: "user not found"});
      }

      const { userName, address, phone } = req.body;
      if (userName) user.userName = userName;
      if (address) user.address = address;
      if (phone) user.phone = phone;

      await user.save();
      res.status(200).send({success: true,message: "USer Updated SUccessfully"});
    } catch (error) {
      console.log(error);
      res.status(500).send({success: false,message: "Error In Udpate Userr API",error});
    }
  };
  
  // UPDATE USER PASSWORD
  exports.updatePasswordController = async (req, res) => {
    try {
      const user = await userModel.findById({ _id: req.body.id });
      if (!user) {
        return res.status(404).send({success: false,message: "Usre Not Found"});
      }
      const { oldPassword, newPassword } = req.body;
      if (!oldPassword || !newPassword) {
        return res.status(500).send({success: false, message: "Please Provide Old or New PasswOrd"});
      }
      
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(500).send({success: false,message: "Invalid old password"});
      }
      
      var salt = bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;
      await user.save();
      res.status(200).send({success: true,message: "Password Updated!"});
    } catch (error) {
      console.log(error);
      res.status(500).send({success: false,message: "Error In Password Update API",error});
    }
  };
  
  // RESET PASSWORd
  exports.resetPasswordController = async (req, res) => {
    try {
      const { email, newPassword, answer } = req.body;
      if (!email || !newPassword || !answer) {
        return res.status(500).send({success: false,message: "Please Privide All Fields"});
      }
      const user = await userModel.findOne({ email, answer });
      if (!user) {
        return res.status(500).send({success: false,message: "User Not Found or invlaid answer"});
      }
      var salt = bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;
      await user.save();
      res.status(200).send({success: true,message: "Password Reset SUccessfully"});
    } catch (error) {
      console.log(error);
      res.status(500).send({success: false,message: "eror in PASSWORD RESET API",error});
    }
  };
  
  // DELETE PROFILE 
  exports.deleteProfileController = async (req, res) => {
    try {
      await userModel.findByIdAndDelete(req.params.id);
      return res.status(200).send({ success: true,message: "Your account has been deleted"});
    } catch (error) {
      console.log(error);
      res.status(500).send({success: false,message: "Erorr In Delete Profile API",error});
    }
  };
  
  // send NOTIFICATION FOR BIRTHDAY WISH
  exports.checkAndNotifyBirthdays = async (req, res) => {
    try {
    
        const today = new Date();
        const todayDateString = today.toISOString().split('T')[0];
        const startOfDay = new Date(`${todayDateString}T00:00:00Z`);
        const endOfDay = new Date(`${todayDateString}T23:59:59Z`);
        
        console.log(todayDateString, "ef", startOfDay, "45r", endOfDay, "fye", today);

        const users = await userModel.find({
            birthDate: {
                $gte: startOfDay,
                $lt: endOfDay
            }
        });
        for (const user of users) {
            const subject = `Happy Birthday, ${user.name}!`;
            const text = `Dear ${user.name},\n\nWishing you a very Happy Birthday!\n\nBest Wishes,`;
            await sendEmail(user.email, subject, text);
            console.log(text)
        }

        return res.status(200).send({ success: true, message: "Happy birthday notifications sent" });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ success: false, message: "Error occurred", error });
    }
};


















  // exports.checkAndNotifyBirthdays = async (req, res) => {
  //   try {
  //     const today = new Date();
  //     const todayDateString = today.toISOString().split('T')[0];
  //     const startOfDay = new Date(todayDateString + 'T00:00:00Z');
  //     const endOfDay = new Date(todayDateString + 'T23:59:59Z');
  //     console.log(todayDateString,"ef",startOfDay,"45r",endOfDay,"fye",today);
  
  //     const users = await userModel.find({
  //       birthDate: {
  //         $gte: startOfDay,
  //         $lt: endOfDay
  //       }
  //     });
  
  //     for (const user of users) {
  //       const subject = `Happy Birthday, ${user.name}!`;
  //       const text = `Dear ${user.name},\n\nWishing you a very Happy Birthday!\n\nBest Wishes,`;
  //       await sendEmail(user.email, subject, text);
  //     }
  
  //     return res.status(200).send({ success: true, message: "Happy birthday notifications sent" });
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).send({ success: false, message: "Error occurred", error });
  //   }
  // };