import React from 'react';
import { useState, useEffect } from "react";

const DeletePage = () => {

  const [product, setProduct] = useState([]);
  const [checked4, setChecked4] = useState(false);
  const [viewer4, setViewer4] = useState(false);
  const [index, setIndex] = useState(0);

  const [viewer1, setViewer1] = useState(false);

  function getOneByOneProductNext() {
    if (product.length > 0) {
      if (index === product.length - 1) setIndex(0);
      else setIndex(index + 1);
      if (product.length > 0) setViewer4(true);
      else setViewer4(false);
    }
  }
  function getOneByOneProductPrev() {
    if (product.length > 0) {
      if (index === 0) setIndex(product.length - 1);
      else setIndex(index - 1);
      if (product.length > 0) setViewer4(true);
      else setViewer4(false);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);
  function getAllProducts() {
    fetch("http://127.0.0.1:4000/api/get")
      .then((response) => response.json())
      .then((data) => {
        console.log("Show Catalog of Products :");
        console.log(data);
        setProduct(data);
      });
    setViewer1(!viewer1);
  }

  function deleteOneProduct(deleteid) {
    console.log("Product to delete :", deleteid);
    fetch(`http://127.0.0.1:4000/api/delete/${deleteid}`, { // Include deleteid in the URL
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete product");
        }
        return response.json(); // Parse JSON response
      })
      .then((data) => {
        console.log("Delete a product completed : ", deleteid);
        console.log(data);
        // Assuming the server responds with { "message": "Post deleted successfully" }
        alert(data.message); // Show the response message
        getAllProducts(); // Call function to update products list
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        // Handle error here if needed
      });
  }

  useEffect(() => {
    getAllProducts();
  }, [checked4]);


  return (
    <div>
      <div>
        <h3>Delete one product:</h3>
        <input type="checkbox" id="acceptdelete" name="acceptdelete" checked={checked4}
          onChange={(e) => setChecked4(!checked4)} />
        <button onClick={() => getOneByOneProductPrev()}>Prev</button>
        <button onClick={() => getOneByOneProductNext()}>Next</button>
        <button onClick={() => deleteOneProduct(product[index].id)}>
          Delete
        </button>
        {checked4 && (
          <div key={product[index].id}>
            <img src={product[index].image} width={30} /> <br />
            Id:{product[index].id} <br />
            Title: {product[index].title} <br />
            Category: {product[index].category} <br />
            Price: {product[index].price} <br />
            Rating :{product[index].rating} <br />
          </div>
        )}
      </div>
    </div>
  );
};

export default DeletePage;