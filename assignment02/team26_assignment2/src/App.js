import React, { useState } from 'react';
import productsData from './products.json'; // Import the JSON data

const App = () => {
  const [view, setView] = useState('browse');
  const [cart, setCart] = useState({});
  const [search, setSearch] = useState('');

  const products = productsData;

  const handleAddToCart = (productId) => {
    const updatedCart = { ...cart };
    updatedCart[productId] = (updatedCart[productId] || 0) + 1;
    setCart(updatedCart);
  };

  const handleRemoveFromCart = (productId) => {
    if (cart[productId] > 1) {
      const updatedCart = { ...cart };
      updatedCart[productId] -= 1;
      setCart(updatedCart);
    } else {
      const { [productId]: _, ...updatedCart } = cart;
      setCart(updatedCart);
    }
  };

  const handleCheckout = () => {
    // Implement the checkout logic here
    setView('cart');
  };

  const handleOrder = () => {
    // Implement the order logic here
    setView('confirmation');
  };

  const handleResetCart = () => {
    setCart({});
    setView('browse');
  };

  const getTotal = () => {
    let total = 0;
    for (const productId in cart) {
      const product = products.find((p) => p.id === parseInt(productId));
      total += cart[productId] * product.price;
    }
    return total;
  };

  return (
    <div className="container">
      <h1>Online Shopping</h1>
      {view === 'browse' && (
        <div>
          <h2>Browse View</h2>
          <input
            type="text"
            placeholder="Search products"
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="row">
            {products
              .filter((product) =>
                product.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((product) => (
                <div className="col" key={product.id}>
                  <img src={product.image} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p>${product.price}</p>
                  <button onClick={() => handleAddToCart(product.id)}>
                    Add to Cart
                  </button>
                </div>
              ))}
          </div>
          <button onClick={handleCheckout}>Go to Cart</button>
        </div>
      )}

      {view === 'cart' && (
        <div>
          <h2>Cart View</h2>
          {Object.keys(cart).map((productId) => (
            <div key={productId}>
              <div>
                {products.find((product) => product.id === Number(productId)).name}
              </div>
              <div>Quantity: {cart[productId]}</div>
              <button onClick={() => handleRemoveFromCart(productId)}>Remove</button>
            </div>
          ))}
          <div>Total: ${getTotal().toFixed(2)}</div>
          <button onClick={handleOrder}>Order</button>
          <button onClick={handleResetCart}>Back to Browse</button>
        </div>
      )}

      {view === 'confirmation' && (
        <div>
          <h2>Confirmation View</h2>
          {Object.keys(cart).map((productId) => (
            <div key={productId}>
              <img
                src={products.find((product) => product.id === Number(productId)).image}
                alt="Product"
              />
              <div>
                {products.find((product) => product.id === Number(productId)).name}
              </div>
              <div>Quantity: {cart[productId]}</div>
            </div>
          ))}
          <div>Total: ${getTotal().toFixed(2)}</div>
          <button onClick={handleResetCart}>Start a New Shopping Session</button>
        </div>
      )}
    </div>
  );
};

export default App;
