const Address = require('../models/addresses');
const mongoose = require('mongoose');


exports.createAddress = async (req, res) => {
    try{
        const address = new Address(req.body);
        const data = await address.save();
        console.log(data);
        res.status(201).json({message: "Address created successfully", data});
    } catch (err){
        console.log(err);
        res.status(400).json({message: "Error creating address", error: err});
        }
};

exports.getAddressesForUser = async (req, res) => {
    try{
        const { user_id } = req.body;
        if(!user_id){
            return res.status(400).json({message: "User ID is required"});
        }
        const addresses = await Address.find({user_id:user_id});
        console.log(addresses)
        if(addresses.length === 0){
            return res.status(404).json({message: "No addresses found for user"});
        }
      
        res.status(201).json({message:"success",addresses});
    }catch(err){
        console.log(err);
        res.status(400).json({message: "Error fetching addresses", error: err});
    
    }
};

exports.updateAddress = async (req, res)=> {
    try{
        const address = await Address.findByIdAndUpdate( req.body, {new: true});
        if(!address){
            return res.status(404).json({message: "Address not found"});
        }
        res.status(200).json({message: "Address updated successfully", data: address});

    }catch(err){
        console.log(err);
        res.status(400).json({message: "Error updating address", error: err});
    }

};

exports.deleteAddress = async (req, res) => {
    try {
        const { userId } = req.body; 
        const addressId = req.body._id;

        if (!addressId) {
            return res.status(400).json({ message: "Address ID is required" });
        }
        if (!mongoose.Types.ObjectId.isValid(addressId)) {
            return res.status(400).json({ message: "Invalid Address ID format" });
        }
        const addressToDelete = await Address.findOne({ _id: addressId, userId: userId });

        if (!addressToDelete) {
            return res.status(404).json({ message: "Address not found or does not belong to the user" });
        }
        const deletedAddress = await Address.findByIdAndDelete(addressId);

        console.log(req.body);
        console.log(deletedAddress);

        if (!deletedAddress) {
            return res.status(404).json({ message: "Address not found" });
        }

        res.status(200).json({ message: "Address deleted successfully" });
    } catch (err) {
        console.error('Error deleting address:', err);
        res.status(400).json({ message: "Error deleting address", error: err });
    }
};