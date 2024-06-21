import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.set("debug", true);
    const con = await mongoose.connect(process.env.MONGO_URI);
    mongoose.connection.once("open", () => {});
    console.log(
      `MongoDB Connected: ${con.connection.host}, Database: ${con.connection.db.databaseName}`
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
