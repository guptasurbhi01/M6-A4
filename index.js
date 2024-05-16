const express = require("express");
import("node-fetch")
  .then((fetch) => {
  })
  .catch((err) => {
    console.error("Error loading node-fetch:", err);
  });

const app = express();
const PORT = process.env.PORT || 3000;

async function fetchRandomJoke() {
  const response = await fetch(
    "https://official-joke-api.appspot.com/random_joke"
  );
  const data = await response.json();
  return data;
}

async function fetchRandomImage() {
  const response = await fetch("https://picsum.photos/200/300");
  const imageURL = response.url;
  return imageURL;
}

app.get("/api/images/random", async (req, res) => {
  try {
    const imageURL = await fetchRandomImage();
    res.json({ image: imageURL });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/jokes-and-images", async (req, res) => {
  try {
    const joke = await fetchRandomJoke();
    const imageURL = await fetchRandomImage();
    res.json({ joke: joke, image: imageURL });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
