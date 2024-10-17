import mongoose from "mongoose";

const upcomingSchema = new mongoose.Schema({
  customer_id: {
    type: Number,
    required: true,
  },
  product_name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  purchase_date: {
    type: Date,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  image_url :{
    type: String,
    required: true,
  }
},{ collection: 'upcoming' });

const Upcoming = mongoose.model('Upcoming', upcomingSchema); 
// Make sure the model name is singular here
export default Upcoming;
