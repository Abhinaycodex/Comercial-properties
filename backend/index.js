import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import Property from "./models/properties.js";
import cors from "cors";


const app = express();
app.use(cors()); 
const port = 5000;
app.use(express.json());



const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
};

// Call the function to connect to the database
connectToDB();


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/properties", async (req, res) => {
  try {
    console.log(req.query);
    const page= Number(req.query.page)|| 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page-1 )*limit;
    const properties = await Property.find({}).skip(skip).limit(limit); // Fetches all properties from MongoDB

    // console.log(properties);
    res.json(properties);
     // Sends the properties as a JSON response
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/properties/add", async(req, res) =>{
  try{
    const property= await Property.create({
      property_id:102,
      property_name:"abhi",
      property_address:"tushar ka ghar",
      property_size:98076.38,
      property_value:"Pound",
      location:"17th Floor",
      year_built:1990,
      owner_name:"dfdsf",
      owner_email:"dfdsf@gmail.com",
      last_inspection_date:"6/7/2020",
      property_type:"fdfdsf"
    })
    res.json({message:'new property added'})
  }
  catch(err){
    res.status(500).json({error: err.message})
  }
})


// app.post('/api/properties/location'){
//   const location = req.body.location;
// }

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
