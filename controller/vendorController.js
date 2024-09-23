const Vendor = require('../models/vendor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User  = require('../models/user');


exports.loginVendor = async (req, res) => {
    console.log("hoja bhai")
    try {
        const { email, password,} = req.body;
        if (!email || !password) {
            return res.status(500).send({success: false,message: "Please Provide Email OR Password"});
          }
        const vendor = await Vendor.findOne({ email });
        console.log("hoja",vendor,"kya dikt hai");
        if (!vendor) {
            return res.status(401).json({ message: 'Not authorized. Email not registered.' });
        }
        
        const isMatch = await bcrypt.compare(password, vendor.password);
        console.log(password,"iyrt");
        console.log(vendor.password,"rt");
        console.log(isMatch,"passu");
         if (!isMatch) {
        return res.status(500).send({success: false, message: "Invalid Password Credentials"});
        }
       
        const token = jwt.sign({ id: vendor._id, email: vendor.email }, process.env.JWT_SECRET_ADMIN,{ expiresIn: '1d' } 
        );
        vendor.password = undefined;
    
        res.status(200).json({status:201, message: 'Login successful',data:vendor,token });
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: err.message });
    }
};

exports.updateProfile = async (req, res)=> {
    try{
        const {nameOfRestaurant,vendorName, email, password, phone, address, rating, location} = req.body;
        const vendor = await Vendor.findOne({email});
        if(!email || !vendorName){
            return res.status(500).send({success: false, message: "Please Provide Email and nameofVendor"})
        }
        if(!password){
            return res.status(500).send({success: false, message: "Please Provide Password"})
        }
        if(nameOfRestaurant){
            vendor.nameOfRestaurant = nameOfRestaurant;

        }
        if(phone){
            vendor.phone = phone;
        }
        if(address){
            vendor.address = address;
            }
        if(rating){
            vendor.rating = rating;
        }
        if(location){
            vendor.location = location;
        }
        let profileStatus;
        if(vendor.nameOfRestaurant && vendor.phone && vendor.address && vendor.rating && vendor.location){
            profileStatus = 1;
            }

        vendor.profileStatus = profileStatus;    
        await vendor.save();
        res.status(200).json({status:201, message: 'Profile Updated Successfully',vendor,profileStatus})

    }catch(error){
        console.log(error)
        res.status(400).json({ message: error.message });
    }
};


exports.getVendors = async (req, res) => {
    try {
        const vendors = await Vendor.find();
        res.status(200).json(vendors);
    }catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
};

exports.getPendingVendors = async (req, res) => {
    try {
      const vendors = await Vendor.find({ status: 'pending' });
      res.render('vendors', { vendors });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.addMenuItems = async (req,res) => {
    try {
      const { email,menuItems } = req.body;
      if(!email || !Array.isArray(menuItems)){
        return res.status(400).send({ success: false, message: "Invalid request" });
      }
      const vendor = await Vendor.findOne({ email });
      if (!vendor) {
        return res.status(404).send({ success: false, message: "Vendor not found"});
          }
          const newMenuItems = await Vendor.updateOne({ email }, { $push: { menuItems}})
          res.status(200).send({ success: true, data: newMenuItems });
          } catch (error) {
            console.error(error);
            res.status(500).send({ success: false, message: "Error adding menu items",error})
          }
  };
  
exports.findNearbyVendors = async (req, res) => {
    try {
      const { userId, maxDistanceInKm } = req.query;
      if (!userId || !maxDistanceInKm) {
        return res.status(400).send({ success: false, message: "User ID and max distance are required" });
      }
  
      const user = await User.findById(userId);
      if (!user || !user.location || !user.location.coordinates) {
        return res.status(400).send({ success: false, message: "User location not found" });
      }
  
      const userLocation = user.location.coordinates;
  
      const maxDistanceInMeters = maxDistanceInKm * 1000;

      const vendors = await Vendor.aggregate([
        {
          $geoNear: {
            near: { type: 'Point', coordinates: userLocation },
            distanceField: 'distance',
            spherical: true,
            maxDistance: maxDistanceInMeters
          }
        }
      ]);
  
      res.status(200).send({ success: true, data: vendors });
    } catch (error) {
      console.error(error);
      res.status(500).send({ success: false, message: "Error finding nearby vendors", error });
    }
  };


  exports.checkProductAvailability = async (req, res) => {
    const {vendorId,productId } = req.body;
    try {
      const vendor = await Vendor.findById(vendorId);
      //console.log(vendor);
      if (!vendor) {
        return res.status(404).send({ success: false, message: "Vendor not found"});
        }
        const product = vendor.menuItems.includes(productId);
        console.log(productId);
        if (!product) {
          return res.status(404).send({ success: false, message: "Product not found"});
          }
          res.status(200).json({message: "success product is available", product})
    }catch(err){
      console.error(err);
      res.status(500).send({ success: false, message: "Error checking product availability",err})

    }
  };     

  exports.reviewsForVendor = async(req, res)=> {
    const {vendorId, userId, comment} = req.body;
   
    try{
      const vendor = await Vendor.findByIdAndUpdate(vendorId,{$push: {reviews: { userId, comment},
      },
    new: true});
      if(!vendor){
        return res.status(404).send({success: false, message: "Vendor not found"})
      }

      return res.status(201).json({message: "Review created successfully", vendor})
    }catch(err){
      console.error(err);
      res.status(500).send({ success: false, message: "Error creating review", err});
    }
  };
  exports.getReviewsForVendor = async (req, res) => {
    const { vendorId } = req.query;
    try {
      const vendor = await Vendor.findById(vendorId).populate('reviews');
      if (!vendor) {
        return res.status(404).send({ success: false, message: "Vendor not found"
          });
      }
      res.status(200).json(vendor.reviews);
      } catch (err) {
        console.error(err);
        res.status(500).send({ success: false, message: "Error fetching reviews", err});
    }
    }











































 // const isProfileComplete = vendor.address && vendor.rating  && vendor.phone ;
        // console.log(isProfileComplete,"hewqiwrf");
        // if (!isProfileComplete) {
        //     return res.status(400).json({ message: 'Please complete your profile information.' });
        // }













        // const isProfileComplete = [vendor.nameOfRestaurant,vendor.phone,vendor.address,vendor.rating]
        // const allFieldPresent = isProfileComplete.every(field => field != null && field !== '');    
        // const profileStatus = allFieldPresent ? 1:0;
