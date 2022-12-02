const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userModel = require("./user");
<<<<<<< HEAD
=======
const configModel = require("./elementconfig");
const imageModel = require("./elementimage");
>>>>>>> d55a0a7de94c08d6bcf1bb795e8a09586fc77182

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


<<<<<<< HEAD
async function findElementByName(name) {
  return await userModel.find({name : name});
=======
  async function getElementImage(element) {
    let result;
    if (element === undefined) {
      result = await imageModel.find();
    }
    return result;
  }

// async function getUsers(elemName, job) {
//   let result;
//   if (elemName === undefined && job === undefined) {
//     result = await userModel.find();
//   } else if (elemName && !job) {
//     result = await findElementByName(elemName);
//   } else if (job && !elemName) {
//     result = await findUserByJob(job);
//   } else if (elemName && job) {
//     result = await findUserByNameAndJob(elemName, job);
//   }
//   return result;
// }

async function findElementById(id) {
  try {
    return await userModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
>>>>>>> d55a0a7de94c08d6bcf1bb795e8a09586fc77182
}

async function disconnectDB() {
  await mongoose.connection.close();
  await mongoose.disconnect();
}

exports.getElements = getElements;
<<<<<<< HEAD
exports.findElementByName = findElementByName;
exports.disconnectDB = disconnectDB;
=======
exports.findElementById = findElementById;
exports.addElement = addElement;
exports.deleteElement = deleteElement;
exports.getElectronConfig = getElectronConfig;
exports.getElementImage = getElementImage;
>>>>>>> d55a0a7de94c08d6bcf1bb795e8a09586fc77182
