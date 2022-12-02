const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userModel = require("./user");

dotenv.config({
  path: ".env",
});

mongoose.set("debug", true);

// mongoose
//   .connect(
//     "mongodb://localhost:27017/elements",
//     {
//       useNewUrlParser: true, //useFindAndModify: false,
//       useUnifiedTopology: true,
//     }
//   )
//   .catch((error) => console.log(error));

mongoose
  .connect(
    "mongodb+srv://" +
      process.env.MONGO_USER +
      ":" +
      process.env.MONGO_PWD +
      "@" +
      process.env.MONGO_CLUSTER +
      "/" +
      process.env.MONGO_DB +
      "?retryWrites=true&w=majority",
    {
      useNewUrlParser: true, //useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )

  async function getElements(name) {
    let result;
    if (name === undefined) {
      result = await userModel.find();
    } else {
      result = await findElementByName(name);
    }
    return result;
  }


async function findElementByName(name) {
  return await userModel.find({name : name});
}

async function disconnectDB() {
  await mongoose.connection.close();
  await mongoose.disconnect();
}

exports.getElements = getElements;
exports.findElementByName = findElementByName;
exports.disconnectDB = disconnectDB;
