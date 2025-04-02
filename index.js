import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const API_KEY = process.env.OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

app.post("/search", async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });

  try {
    const response = await axios.get(`${BASE_URL}?s=${title}&apikey=${API_KEY}`);
    res.json(response.data.Search); 
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});


app.get("/movie/:id", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}?i=${req.params.id}&apikey=${API_KEY}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movie details" });
  }
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
