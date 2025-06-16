// server.js or api.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

app.get("/api/alerts", async (req, res) => {
  try {
    const response = await axios.get(
      "https://www.oref.org.il/WarningMessages/alert/alerts.json"
    );
    console.log(`log alert res: ${response.data}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Failed to fetch alerts");
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
