const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongodb connected`);
  } catch (err) {
    console.error(`DB Error: ${error}`);
    process.exit(1);
  }
};

module.exports = connectDB;
