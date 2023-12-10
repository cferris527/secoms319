import React from 'react';
import { useState, useEffect } from "react";

const CreatePage = () => {

  const [addNewProduct, setAddNewProduct] = useState({
    id: 0,
    title: "",
    price: 0.0,
    description: "",
    category: "",
    image: "http://127.0.0.1:4000/images/",
    rating: 0.0,
});

  function handleChange(evt) {
    const value = evt.target.value;
    if (evt.target.name === "id") {
        setAddNewProduct({ ...addNewProduct, id: value });
    } else if (evt.target.name === "title") {
        setAddNewProduct({ ...addNewProduct, title: value });
    } else if (evt.target.name === "price") {
        setAddNewProduct({ ...addNewProduct, price: value });
    } else if (evt.target.name === "description") {
        setAddNewProduct({ ...addNewProduct, description: value });
    } else if (evt.target.name === "category") {
        setAddNewProduct({ ...addNewProduct, category: value });
    } else if (evt.target.name === "image") {
        setAddNewProduct({ ...addNewProduct, image: value });
    } else if (evt.target.name === "rating") {
        setAddNewProduct({ ...addNewProduct, rating: value });
    }
}

function handleOnSubmit(e) {
  e.preventDefault();
  console.log(e.target.value);
  fetch("http://127.0.0.1:4000/api/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addNewProduct),
  })
      .then((response) => response.json())
      .then((data) => {
          console.log("Post a new product completed");
          console.log(data);
          if (data) {
              //const keys = Object.keys(data);
              const value = Object.values(data);
              alert(value);
          }
      });
}




  return (
    <div>
      <h1>Create</h1>
            <div>
                <h3>Add a new product :</h3>
                <form action="">
                    <input type="number" placeholder="id?" name="id" value={addNewProduct.id}
                        onChange={handleChange} />
                    <input type="text" placeholder="title?" name="title" value={addNewProduct.title}
                        onChange={handleChange} />
                    <input type="number" placeholder="price?" name="price" value={addNewProduct.price}
                        onChange={handleChange} />
                    <input type="text" placeholder="description?" name="description" value={addNewProduct.description}
                        onChange={handleChange} />
                    <input type="text" placeholder="category?" name="category" value={addNewProduct.category}
                        onChange={handleChange} />
                    <input type="text" placeholder="image?" name="image" value={addNewProduct.image}
                        onChange={handleChange} />
                    <input type="number" placeholder="rate?" name="rating" value={addNewProduct.rating}
                        onChange={handleChange} />
                    <button type="submit" onClick={handleOnSubmit}>
                        submit
                    </button>
                </form>
            </div>
    </div>
  );
};

export default CreatePage;