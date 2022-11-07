const mongoose = require("mongoose");

const ElementSchema = new mongoose.Schema(
  {
    elemName: {
      type: String,
      required: true,
      trim: true,
    },
    elemSymbol: {
      type: String,
      required: true,
      trim: true,
    },
    elemNum: {
        type: Number,
        required: true,
    }
  },
  { collection: "elements" }
);

const Elements = mongoose.model("Elements", ElementSchema);

module.exports = Elements;