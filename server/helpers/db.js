const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(
    "mongodb+srv://asd:asd@cluster0.iai8v.mongodb.net/charityDb?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  mongoose.connection.on("open", () => {
    console.log("MongoDb: Connected");
  });
  mongoose.connection.on("error", () => {
    console.log("MongoDb: Connection Failed");
  });
  mongoose.Promise = global.Promise;
};
