import express from "express";
import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.post("/", async (req, res) => {
  const { text } = req.body;

  try {
    const url = process.env.PYTHON_API || "http://localhost:5002/";
    //const ulr = "http://localhost:5002/";
    const response = await axios.post(url, { text });
    if (!response.data.formal){
        console.log("fail fail")
        res.json({ formal:"fail" })
    }
    res.json({ formal: response.data.formal });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Formalization service failed" });
  }
});

export default router;

