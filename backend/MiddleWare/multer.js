import multer from 'multer';

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique file naming
  },
});

const upload = multer({ storage: storage });

// Route for adding property with file uploads
app.post('/api/properties/add', upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'property_image', maxCount: 1 }
]), async (req, res) => {
  try {
    const { body, files } = req;
    // Access files using `req.files.thumbnail` or `req.files.property_image`
    const thumbnailPath = files?.thumbnail ? files.thumbnail[0].path : null;
    const propertyImagePath = files?.property_image ? files.property_image[0].path : null;

    // Save data to database (including file paths if needed)
    const property = await Property.create({
      ...body,
      thumbnail: thumbnailPath,
      property_image: propertyImagePath,
    });

    res.status(201).json({ message: 'New property added successfully', property });
  } catch (err) {
    res.status(500).json({ error: 'Error adding property. Please try again.' });
  }
});

export default multer;
