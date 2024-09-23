require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoute');
const authRouth = require('./routes/authRoute');
const user = require('./data.json');
const vendorRoutes = require('./routes/vendorRoute');
const addressRoute = require('./routes/address');
const orderRoute = require('./routes/orderRoute');
const DeliveryRoute = require('./routes/deliveryMan')
const adminRoutes = require('./routes/admin');

//productroutes
const productRoutes = require('./routes/productRoute/productRoutes');
const categoryRoutes = require('./routes/productRoute/category');
const productSubcategoryRoutes = require('./routes/productRoute/subCategory');

connectDB();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api',userRoutes);
app.use('/api',vendorRoutes);
app.use('/api',adminRoutes);
app.use('/api',productRoutes);
app.use('/api',categoryRoutes);
app.use('/api',DeliveryRoute);
app.use('/api',orderRoute);
app.use('/api',addressRoute);
app.use('/api',productSubcategoryRoutes);
app.use('/api',authRouth);
app.use('/user',(req,res)=>{
    res.json(user);
  })

app.listen(process.env.PORT,() =>{
    console.log(`Server is running on port ${process.env.PORT}`);
})