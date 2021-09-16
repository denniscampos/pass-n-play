const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.DB_NAME, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log(`MongoDB: ${connect.connection.host}`);
  } catch (error) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
