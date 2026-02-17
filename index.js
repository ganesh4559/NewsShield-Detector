const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/analyze", async (req, res) => {
  try {
    const { text } = req.body;

    const mlResponse = await axios.post(
      "http://127.0.0.1:8000/predict",
      { text }
    );

    res.json({
      label: mlResponse.data[0].label,
      score: mlResponse.data[0].score
    });

  } catch (error) {
    console.error("Backend error:", error.message);
    res.status(500).json({ error: "ML service error" });
  }
});

app.listen(5000, () => console.log("Backend running on port 5000"));
