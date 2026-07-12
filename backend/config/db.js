const mongoose = require("mongoose");
const connectDB = async ()=> {
    try{
        await mongoose.connect(process.env.MANGO_URI);
        console.log("MongoDB connected successfully");
    }
    catch (error)
{
    console.log("MangoDB connection failed:", error.message);
    process.exit(1);
}
} ;

module.exports = connectDB;
