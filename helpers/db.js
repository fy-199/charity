const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect( "mongodb+srv://mern1:mern1@freecodecamp.axiyj.mongodb.net/charityDb1?retryWrites=true&w=majority",
    //"mongodb+srv://asd:asd@cluster0.iai8v.mongodb.net/charityDb?retryWrites=true&w=majority",
    
    //"mongodb+srv://dvt:dvt@cluster0.beobe.mongodb.net/charityDBdavut?retryWrites=true&w=majority",
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
