const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "user name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    birthDate: {
        type: String,
    },
    address: {
      type: Array,
      coordinates: { type: [Number], default: [0, 0] }
    },
    phone: {
      type: String,
      required: [true, "phone number is require"],
    },
    // role: {
    //   type: String,
    //   required: [true, "user type is required"],
    //   enum: ["user", "admin"],
    //   default: "user",
    // },
    profileImage: {
      type: String,
    },
    location:{
      type: {
      type: String,
      enum: ['Point'],
      },
      coordinates: {
        type: [Number],
        index: '2dsphere'
        },
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);