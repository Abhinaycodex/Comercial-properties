import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import Property from "./models/properties.js";
import cors from "cors";


const app = express();
app.use(cors()); 
const port = 8000;
app.use(express.json());


// connecting to mongoDB 
// mongoose.connect(process.env.DB_URI)
// .then(() => console.log("Connected to MongoDB"))
// .catch((err) => console.log(err));

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

app.get("/properties", async (req, res) => {
  try {
    const properties = await Property.find(); // Fetches all properties from MongoDB
    res.json(properties); // Sends the properties as a JSON response
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Saving new properties via POST (if needed, optional)
// app.post("/properties", async (req, res) => {
//   try {
//     const { property_id, property_name, property_type, property_size, property_value, location, year_built, owner_name, owner_email, last_inspection_date } = req.body;

//     const property = new Property({
//       property_id,
//       property_name,
//       property_type,
//       property_size,
//       property_value,
//       location,
//       year_built,
//       owner_name,
//       owner_email,
//       last_inspection_date
//     });

//     await property.save(); // Saves the new property in MongoDB
//     res.send("Property saved!");
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

app.get('/users', (req, res)=>{
  return res.json(users);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
