import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      `${process.eventNames.MONGODB_URI}` / `${process.env.DB_NAME}`
    );
  } catch (error) {
    console.log("MONGODB connection failed in connectDB ", error);
  }
};

export default connectDB;
