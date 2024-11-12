import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  property_id: {
    type: Number,
    required:true,
    unique:true
  },
  property_name: {
    type: String,
    required: true,
  },
  property_type: {
    type: String,
    required: true,
  },
  property_size: {
    type: Number,
    required: true,
  },
  property_value: {
    type: Number, // Consider using a number type if this is monetary value
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  year_built: {
    type: Number,
    required: true,
    min: 1000, // Example minimum year validation
    max: new Date().getFullYear(), // Ensure it isn't a future year
  },
  owner_name: {
    type: String,
    required: true,
  },
  owner_email: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address'], // Email validation
  },
  last_inspection_date: {
    type: Date,
    required: true,
  },
  thumbnail: {
    type: String,
  },
  property_image: {
    type: String,
  },
});


const Property = mongoose.model("Property", propertySchema);

export default Property;
