import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import Property from "./models/properties.js";
import cors from "cors";
import Upcoming from "./models/upcoming.js";
import User from "./models/user.js";
import multer from "multer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const port = process.env.PORT || 5000;

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename generation
  },
});

const upload = multer({ storage: storage });

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
  res.send("Hello World this is working fine!");
});

// Get properties with search, price range, and pagination
app.get("/api/properties", async (req, res) => {
  
  try {
    const searchQuery = req.query.search || "";
    const minPrice = Number(req.query.minPrice) || 0;
    const maxPrice = Number(req.query.maxPrice) || 100000;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Validate price range
    if (minPrice < 0 || maxPrice < 0 || minPrice > maxPrice) {
      return res.status(400).json({ error: "Invalid price range" });
    }

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

      // Access uploaded file paths safely
      const thumbnailPath = req.files?.thumbnail?.[0]?.path || null;
      const propertyImagePath = req.files?.property_image?.[0]?.path || null;

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

      res.status(201).json({
        message: "Property added successfully",
        property,
      });
    } catch (err) {
      console.error("Error adding property:", err);
      res.status(500).json({ error: err.message});
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
app.get("/api/properties/:_id", async (req, res) => {
  try {
    const propertyId = req.params._id;
    const property = await Property.findOne({ _id: propertyId });

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



const JWT_SECRET = process.env.JWT_SECRET || "yourSecretKey"; 

app.post("/api/register", async (req, res) => {
  try {
    const { user_name, email, password } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = new User({ user_name, email, password: hashedPassword });

    // Save user
    await user.save();

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user_id: user._id.toString(),
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
});




// SELL a property
app.post(
  "/api/properties/sell",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "property_image", maxCount: 1 },
  ]),
  async (req, res) => {
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

      // Validate seller (must exist in User collection)
      const seller = await User.findOne({ email: owner_email });
      if (!seller) {
        return res.status(400).json({ msg: "Seller not registered" });
      }

      // Check if property already exists
      const existingProperty = await Property.findOne({ property_id });
      if (existingProperty) {
        return res.status(400).json({ msg: "Property already listed" });
      }

      // Save images if provided
      const thumbnailPath = req.files?.thumbnail?.[0]?.path || null;
      const propertyImagePath = req.files?.property_image?.[0]?.path || null;

      // Create property
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
        property_image: propertyImagePath,
      });

      res.status(201).json({
        msg: "Property listed for sale successfully",
        property,
      });
    } catch (error) {
      console.error("Error selling property:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

// BUY a property
app.post("/api/properties/buy/:property_id", async (req, res) => {
  try {
    const propertyId = req.params.property_id;
    const { buyer_email } = req.body;

    // Validate buyer
    const buyer = await User.findOne({ email: buyer_email });
    if (!buyer) {
      return res.status(400).json({ msg: "Buyer not registered" });
    }

    // Find property
    const property = await Property.findOne({ property_id: propertyId });
    if (!property) {
      return res.status(404).json({ msg: "Property not found" });
    }

    // Prevent buying own property
    if (property.owner_email === buyer_email) {
      return res.status(400).json({ msg: "You already own this property" });
    }

    // Transfer ownership
    property.owner_name = buyer.user_name;
    property.owner_email = buyer.email;
    await property.save();

    res.status(200).json({
      msg: "Property purchased successfully",
      property,
    });
  } catch (error) {
    console.error("Error buying property:", error);
    res.status(500).json({ error: error.message });
  }
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
