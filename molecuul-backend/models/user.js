const mongoose = require("mongoose");

const ElementSchema = new mongoose.Schema(
  {
    configs: {
      type: Array,
      required: true,
      trim: true,
    },
    atomicNum: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    symbol: {
      type: String,
      required: true,
      trim: true,
    },
    tile: {
      type: String,
      required: true,
    },
  },
  { collection: "elements" }
);

const Element = mongoose.model("Element", ElementSchema);

module.exports = Element;
