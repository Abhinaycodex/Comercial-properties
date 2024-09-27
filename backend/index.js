import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import Property from "./models/properties.js";

const app = express();
const port = 3000;
app.use(express.json());

mongoose.connect(process.env.DB_URI);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/properties", async (req, res) => {
  const { name, value } = req.body;
  const property = new Property({ name, value });
  await property.save();
  res.send("Property saved!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
