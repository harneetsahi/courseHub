import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
    console.log("connected to mongo");
  } catch (error) {
    console.log("MONGODB connection failed in connectDB ", error);
  }
};

export default connectDB;
