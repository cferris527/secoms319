const express = require("express");
const db = require("./db.js");
const cors = require("cors");
const app = express();
const PORT = 4000;
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/images", express.static("images"));
app.listen(PORT, () => {
console.log(`Server is running on ${PORT}`);
});

// Route to get all posts
app.get("/api/get", (req, res) => {
    db.query("SELECT * FROM fakestore_catalog", (err, result) => {
    if (err) {
    console.log(err);
    }
    res.send(result);
    });
    });

// Route to get one post
app.get("/api/getFromId/:id", (req, res) => {
    const id = req.params.id;
    db.query(
    "SELECT * FROM fakestore_catalog WHERE id = ?", id,
    (err, result) => {
    if (err) {
    console.log(err);
    }
    res.send(result);
    }
    );
    });

// Route for creating the post
app.post("/api/create", (req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const category = req.body.category;
    const image = req.body.image;
    const rating = req.body.rating;
    console.log(id, title, price, description, category, image, rating);
    db.query(
    "INSERT INTO fakestore_catalog (id, title, price, description, category, image, rating) VALUES (?,?,?,?,?,?,?)",
    [id, title, price, description, category, image, rating],
    (err, result) => {
    if (err) {
    console.log(err);
    }
    console.log(result);
    }
    );
    });

// Route for update a post
app.put("/api/update", (req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const category = req.body.category;
    const image = req.body.image;
    const rating = req.body.rating;
    console.log(id, title, price, description, category, image, rating);
    db.query(
    "UPDATE fakestore_catalog SET title=?, price=?, description=?, category=?, image=?, rating=? WHERE id=?",
    [title, price, description, category, image, rating, id],
    (err, result) => {
    if (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
    } else {
    console.log(result);
    res.status(200).send('Resource Updated');
    }
    }
    );
    });

// Route for like
app.post("/api/like/:id", (req, res) => {
    const id = req.params.id;
    db.query(
    "UPDATE fakestore_catalog SET likes = likes + 1 WHERE id = ?",
    id,
    (err, result) => {
    if (err) {
    console.log(err);
    }
    console.log(result);
    }
    );
    });