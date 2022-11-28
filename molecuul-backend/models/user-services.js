const mongoose = require("mongoose");
<<<<<<< HEAD
const userModel = require("./user");
mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost:27017/elements", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
=======
const dotenv = require("dotenv");
const userModel = require("./user");
const configModel = require("./elementconfig");
const imageModel = require("./elementimage");
const quizModel = require("./quizzes");

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
>>>>>>> 153ac170559726960500ae80b78e8061d7eff32e
  .catch((error) => console.log(error));

  async function getElements(elemName, elemSymbol) {
    let result;
    if (elemName === undefined && elemSymbol === undefined) {
      result = await userModel.find();
<<<<<<< HEAD
=======
      console.log("result " + result);
>>>>>>> 153ac170559726960500ae80b78e8061d7eff32e
    } else if (elemName && elemSymbol == undefined) {
      result = await findElementByName(elemName);
    }
    return result;
  }

<<<<<<< HEAD
=======
  async function getElectronConfig(config_id) {
    let result;
    if (config_id === undefined) {
      result = await configModel.find();
    }
    return result;
  }

  async function getQuizzes(question) {
    let result;
    if (question === undefined) {
      result = await quizModel.find();
    }
    return result;
  }

  async function getElementImage(element) {
    let result;
    if (element === undefined) {
      result = await imageModel.find();
    }
    return result;
  }

>>>>>>> 153ac170559726960500ae80b78e8061d7eff32e
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
}

<<<<<<< HEAD
=======
async function findQuizById(id) {
  try {
    return await quizModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

>>>>>>> 153ac170559726960500ae80b78e8061d7eff32e
async function addElement(user) {
  try {
    const userToAdd = new userModel(user);
    const savedUser = await userToAdd.save();
    return savedUser;
  } catch (error) {
    console.log(error);
    return false;
  }
}

<<<<<<< HEAD
=======
async function deleteElement(elemName) {
    return await userModel.deleteOne({elemName : elemName});
  
}

>>>>>>> 153ac170559726960500ae80b78e8061d7eff32e
async function findElementByName(elemName) {
  return await userModel.find({ elemName: elemName });
}

// async function findUserByJob(job) {
//   return await userModel.find({ job: job });
// }

// async function findUserByNameAndJob(name, job) {
//   return await userModel.find({name: name, job: job });
// }

exports.getElements = getElements;
exports.findElementById = findElementById;
<<<<<<< HEAD
exports.addElement = addElement;
=======
exports.addElement = addElement;
exports.deleteElement = deleteElement;
exports.getElectronConfig = getElectronConfig;
exports.getElementImage = getElementImage;
exports.findQuizById = findQuizById;
exports.getQuizzes = getQuizzes;
>>>>>>> 153ac170559726960500ae80b78e8061d7eff32e
