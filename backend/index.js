import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import Property from "./models/properties.js";
import cors from "cors";
import Upcoming from "./models/upcoming.js";
import User from "./models/user.js";
import multer from "multer"; // Import multer for file uploads

const app = express();
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parses incoming URL-encoded data

const port = process.env.PORT || 5000;

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/"); // Specify the directory where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename generation
  },
});

const upload = multer({ storage: storage }); // Define 'upload' middleware with multer configuration

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1); // Exit if database connection fails
  }
};

// Call the function to connect to the database
connectToDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Get properties with search, price range, and pagination
app.get("/api/properties", async (req, res) => {
  try {
    const searchQuery = req.query.search || "";
    const minPrice = Number(req.query.minPrice) || 0;
    const maxPrice = Number(req.query.maxPrice) || 100000;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 3;
    const skip = (page - 1) * limit;

    const properties = await Property.find({
      property_name: { $regex: searchQuery, $options: "i" },
      property_size: { $gte: minPrice, $lte: maxPrice },
    })
      .skip(skip)
      .limit(limit);

    res.json(properties);
  } catch (err) {
    console.error("Error fetching properties:", err);
    res
      .status(500)
      .json({ error: "Error fetching properties. Please try again." });
  }
});

// Add property with file uploads (e.g., thumbnail and property_image)
app.post(
  "/api/properties/add",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "property_image", maxCount: 1 },
  ]),
  async (req, res) => {
    console.log("Received Data:", req.body);
    console.log("Received Files:", req.files);
    try {
      const {
        property_id,
        property_name,
        property_address,
        property_size,
        property_value,
        location,
        year_built,
        owner_name,
        owner_email,
        last_inspection_date,
        property_type,
      } = req.body;

      // Access uploaded file paths
      const thumbnailPath = req.files?.thumbnail
        ? req.files.thumbnail[0].path
        : null;
      const propertyImagePath = req.files?.property_image
        ? req.files.property_image[0].path
        : null;

      // Create new property entry
      const property = await Property.create({
        property_id,
        property_name,
        property_address,
        property_size,
        property_value,
        location,
        year_built,
        owner_name,
        owner_email,
        last_inspection_date,
        property_type,
        thumbnail: thumbnailPath,
        propertyImage: propertyImagePath,
      });

      res
        .status(201)
        .json({ message: "property added successfully", property });
    } catch (err) {
      console.error("Error adding property:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

// Get upcoming properties with pagination
app.get("/api/upcoming", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 3;
    const skip = (page - 1) * limit;

    const upcomingProperties = await Upcoming.find({}).skip(skip).limit(limit);
    res.json(upcomingProperties);
  } catch (err) {
    console.error("Error fetching upcoming properties:", err);
    res
      .status(500)
      .json({ error: "Error fetching properties. Please try again." });
  }
});

// Get property by ID
app.get("/api/properties/:property_id", async (req, res) => {
  try {
    const propertyId = req.params.property_id;
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json(property);
  } catch (err) {
    console.error("Error fetching property:", err);
    res
      .status(500)
      .json({ error: "Error fetching property. Please try again." });
  }
});

app.post("/api/register", async (req, res) => {
  try {
    // Destructure according to the schema
    const { user_name, email, password } = req.body;

    //email logic
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "User with this email already exists." });
    }

    // Create a new user instance
    const user = new User({ user_name, email, password });

    // Save the user to the database
    await user.save();

    res
      .status(200)
      .json({
        msg: "User registered successfully",
        token: await user.generateToken(),
        user_id: user._id.toString(),
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
