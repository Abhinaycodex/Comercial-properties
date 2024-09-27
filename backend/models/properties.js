import mongoose from "mongoose";

const propertiesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const Property = mongoose.model("Property", propertiesSchema);

export default Property;
