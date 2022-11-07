const mongoose = require("mongoose");
const elementModel = require("./elements");
mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost:27017/elements", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

  async function getElements(elemName) {
    let result;
    if (elemName === undefined) {
      result = await elementModel.find()
    } else if (elemName) {
      result = await findElementByName(elemName);
    }
    return result;
  }

  async function findElementByName(elemName) {
    return await elementModel.find({ elemName: elemName });
  }

  exports.getElements = getElements;
  exports.getElements = findElementByName;
