const mongoose = require("mongoose");
// const config = require("config");
// const dbURI = config.get("mongoURI");

const urlStr = `mongodb+srv://santhakumar:Santha@cluster0.frto8.mongodb.net/test?authSource=admin&replicaSet=atlas-slfoei-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`;

const connectDB = async () => {
  try {
    await mongoose.connect(urlStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = connectDB;
