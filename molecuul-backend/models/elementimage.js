const mongoose = require("mongoose");

const ElementImageSchema = new mongoose.Schema(
  {
    config_id: {
      type: Number,
      required: true,
      trim: true,
    },
    config: {
      type: String,
      required: true,
    },
  },
  { collection: "element_image" }
);

const ElementImage = mongoose.model("ElementImage", ElementImageSchema);

module.exports = ElementImage;
