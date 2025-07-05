const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/download", async (req, res) => {
  const { url } = req.body;

  try {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      return res.json({
        success: true,
        links: [
          { url: `https://api.vevioz.com/api/button/mp4/${url}`, quality: "MP4 via Vevioz" }
        ]
      });
    }

    else if (url.includes("facebook.com")) {
      return res.json({
        success: true,
        links: [
          { url: `https://fdown.net/download.php?url=${encodeURIComponent(url)}`, quality: "Download via FDown" }
        ]
      });
    }

    else {
      return res.json({ success: false, message: "Ba a goyon bayan wannan link ɗin ba tukuna." });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Matsala ta faru a cikin server." });
  }
});

app.get("/", (req, res) => {
  res.send("Video Downloader API na aiki!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});