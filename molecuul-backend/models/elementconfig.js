const mongoose = require("mongoose");

const ElementConfigSchema = new mongoose.Schema(
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
  { collection: "electron_config" }
);

const ElementConfig = mongoose.model("ElementConfig", ElementConfigSchema);

module.exports = ElementConfig;
