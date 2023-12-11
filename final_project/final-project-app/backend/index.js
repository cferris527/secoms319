const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors package
const app = express();
const port = 3080;
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/ArtistInsight', {});

// Create Mongoose Schemas for each collection
const albumSchema = new mongoose.Schema({
  Name: String,
  Singer: String,
  Image: String,
  Date: String,
  Songs: [String],
  // Add other fields as needed
}, { collection : 'Albums' });

const artistSchema = new mongoose.Schema({
  Name: String,
  Born: String,
  Image: String,
  Hometown: String,
  FunFact: String,
  Album: String,
  Songs: [String],
  // Add other fields as needed
}, { collection : 'Artists' });

const songSchema = new mongoose.Schema({
  Name: String,
  Image: String,
  Duration: String,
  Plays: String,
  Album: String,
  Songs: [String],
  // Add other fields as needed
}, { collection : 'Songs' });

const Album = mongoose.model('Album', albumSchema);
const Artist = mongoose.model('Artist', artistSchema);
const Song = mongoose.model('Song', songSchema);
// CRUD operations for Albums collection

// Create an album
app.post('/albums', async (req, res) => {
  try {
    const { title, artistId, songs } = req.body;
    const album = await Album.create({ title, artistId, songs });
    res.json(album);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read all albums
app.get('/albums', async (req, res) => {
  try {
    const albums = await Album.find();
    res.json(albums);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an album by ID
app.put('/albums/:id', async (req, res) => {
  try {
    const album = await Album.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(album);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an album by ID
app.delete('/albums/:id', async (req, res) => {
  try {
    const album = await Album.findByIdAndDelete(req.params.id);
    res.json(album);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CRUD operations for Artists collection

// Create an artist
app.post('/artists', async (req, res) => {
  try {
    const {
      Name,
      Born,
      Image,
      Hometown,
      FunFact,
      Album,
      Songs // If needed
    } = req.body;
    const newArtist = await Artist.create({
      Name,
      Born,
      Image,
      Hometown,
      FunFact,
      Album,
      Songs // If needed
    });

    res.json(newArtist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read all artists
app.get('/artists', async (req, res) => {
  try {
    const artists = await Artist.find();
    res.json(artists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an artist by ID
app.put('/artists/:name/funfact', async (req, res) => {
  try {
    const { name } = req.params;
    const { newFunFact } = req.body; // Assuming the updated fun fact is sent in the request body

    const updatedArtist = await Artist.findOneAndUpdate(
      { Name: name },
      { $set: { FunFact: newFunFact } },
      { new: true }
    );

    if (!updatedArtist) {
      return res.status(404).json({ error: 'Artist not found' });
    }

    res.json(updatedArtist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Delete an artist by ID
app.delete('/artists/:name', async (req, res) => {
  console.log(req);
  try {
    const { name } = req.params;
    const artist = await Artist.findOneAndDelete({ Name: name });
    
    if (!artist) {
      return res.status(404).json({ error: 'Artist not found' });
    }

    res.json(artist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CRUD operations for Songs collection

// Create a song
app.post('/songs', async (req, res) => {
  try {
    const { title, artistId, albumId } = req.body;
    const song = await Song.create({ title, artistId, albumId });
    res.json(song);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read all songs
app.get('/songs', async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a song by ID
app.put('/songs/:id', async (req, res) => {
  try {
    const song = await Song.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(song);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a song by ID
app.delete('/songs/:id', async (req, res) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);
    res.json(song);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});