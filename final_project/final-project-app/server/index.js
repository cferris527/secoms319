const express = require('express');
const app = express();
const path = require('path');
const cors = require("cors");
var bodyParser = require("body-parser");
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json());

// Serve static files (like JSON files)
app.use(express.static(path.join(__dirname, 'public')));

app.get('/artistInfo', (req, res) => {
  // Read artists.json and send it as a response
  const artistsData = require('./data/artists.json');
  res.json(artistsData);
  res.status(200);

});

app.get('/songInfo', (req, res) => {
  // Read songs.json and send it as a response
  const songsData = require('./data/songs.json');
  res.json(songsData);
  res.status(200);

});

app.get('/albumInfo', (req, res) => {
  // Read album.json and send it as a response
  const albumData = require('./data/album.json');
  res.json(albumData);
  res.status(200);

});

// Other server setup code...

const PORT = 8080; // Or any other port you want to use
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
