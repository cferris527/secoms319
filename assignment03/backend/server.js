const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = 4000;
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/images", express.static("images"));

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/fakestoreAPI", {});

const fakestoreSchema = new mongoose.Schema({
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  rating: Number,
  likes: { type: Number, default: 0 },
}, {collection: 'FakestoreCatalog'});

const Fakestore = mongoose.model("FakestoreCatalog", fakestoreSchema);

// Route to get all posts
app.get("/api/get", async (req, res) => {
  try {
    const posts = await Fakestore.find({});
    res.send(posts);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Route to get one post
app.get("/api/getFromId/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Fakestore.findOne({ id: parseInt(id) });
    res.send(post);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Route for creating a post
app.post("/api/create", async (req, res) => {
  try {
    const { id, title, price, description, category, image, rating } = req.body;
    const newPost = new Fakestore({
      id,
      title,
      price,
      description,
      category,
      image,
      rating,
    });
    await newPost.save();
    console.log("Post created successfully\n");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Route for updating a post
app.put("/api/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { title, price, description, category, image, rating } = req.body;
    await Fakestore.updateOne(
      { id: parseInt(id) },
      {
        $set: {
          title,
          price,
          description,
          category,
          image,
          rating,
        },
      }
    );
    console.log("Post updated successfully\n");
  } catch (error) {
    res.status(500).send("Internal Server Error\n");
  }
});

// Route for incrementing likes
app.post("/api/like/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Fakestore.updateOne({ id: parseInt(id) }, { $inc: { likes: 1 } });
    console.log("Like incremented successfully\n");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

app.delete("/api/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Fakestore.deleteOne({ id: parseInt(id) });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});