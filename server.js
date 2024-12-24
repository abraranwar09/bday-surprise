const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("src"));

app.post("/api/get-events", async (req, res) => {
  const { month, day } = req.body;
  try {
    const response = await axios.get(`https://today.zenquotes.io/api/${month}/${day}`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Error fetching data from external API" });
  }
});

app.get("/api/get-image", async (req, res) => {
  const { articleName } = req.query;
  console.log("Received request for articleName:", articleName);

  try {
    const response = await axios.get(`https://en.wikipedia.org/w/api.php`, {
      params: {
        action: "query",
        format: "json",
        prop: "pageimages",
        piprop: "thumbnail",
        pithumbsize: 500,
        titles: articleName,
        redirects: 1,
      },
    });

    console.log("Wikimedia API response:", response.data);

    const pages = response.data.query.pages;
    const page = Object.values(pages)[0];
    const imageUrl = page.thumbnail ? page.thumbnail.source : null;

    if (imageUrl) {
      console.log("Image URL found:", imageUrl);
      res.json({ imageUrl });
    } else {
      console.warn("Image not found for articleName:", articleName);
      res.status(404).json({ error: "Image not found" });
    }
  } catch (error) {
    console.error("Error fetching image from Wikimedia:", error);
    res.status(500).json({ error: "Error fetching image from Wikimedia" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

