import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  property_id: {
    type: Number,
    required: true,
    unique: true // Ensures no duplicate property IDs
  },
  property_name: {
    type: String,
    required: true
  },
  property_type: {
    type: String,
    required: true
  },
  property_size: {
    type: Number,
    required: true
  },
  property_value: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  year_built: {
    type: Number,
    required: true
  },
  owner_name: {
    type: String,
    required: true
  },
  owner_email: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address'] // Email validation
  },
  last_inspection_date: {
    type: Date,
    required: true
  }
});

const Property = mongoose.model("Property",  propertySchema);

export default Property;
