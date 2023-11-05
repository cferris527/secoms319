import React, { useState } from 'react';

const App = () => {
  const [view, setView] = useState('browse');
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', description: 'Description 1', price: 10, image: 'product1.jpg' },
    { id: 2, name: 'Product 2', description: 'Description 2', price: 15, image: 'product2.jpg' },
    // Add more products
  ]);
  const [cart, setCart] = useState({});
  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    card: '',
    address: '',
    // Add more fields as needed
  });

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleAddToCart = (product) => {
    const updatedCart = { ...cart };
    updatedCart[product.id] = (updatedCart[product.id] || 0) + 1;
    setCart(updatedCart);
  };

  const handleRemoveFromCart = (productId) => {
    const updatedCart = { ...cart };
    if (updatedCart[productId] > 1) {
      updatedCart[productId] -= 1;
    } else {
      delete updatedCart[productId];
    }
    setCart(updatedCart);
  };

  const handleCheckout = () => {
    setView('cart');
  };

  const handleOrder = () => {
    setView('confirmation');
    // Implement order handling and data submission here
  };

  const handleResetCart = () => {
    setCart({});
    setView('browse');
  };

  return (
    <div>
      {view === 'browse' && (
        <div>
          <input type="text" placeholder="Search products" value={search} onChange={handleSearchChange} />
          <div className="row">
            {products
              .filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))
              .map((product) => (
                <div className="col" key={product.id}>
                  <img src={product.image} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p>${product.price}</p>
                  <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                </div>
              ))}
          </div>
          <button onClick={handleCheckout}>Go to Cart</button>
        </div>
      )}

      {view === 'cart' && (
        <div>
          <h2>Cart</h2>
          <div>
            {Object.keys(cart).map((productId) => (
              <div key={productId}>
                <div>{products.find((product) => product.id === Number(productId)).name}</div>
                <div>Quantity: {cart[productId]}</div>
                <button onClick={() => handleRemoveFromCart(productId)}>Remove</button>
              </div>
            ))}
          </div>
          <button onClick={handleOrder}>Checkout</button>
        </div>
      )}

      {view === 'confirmation' && (
        <div>
          <h2>Confirmation</h2>
          <div>
            {Object.keys(cart).map((productId) => (
              <div key={productId}>
                <div>{products.find((product) => product.id === Number(productId)).name}</div>
                <div>Quantity: {cart[productId]}</div>
              </div>
            ))}
          </div>
          <div>Total: {/* Calculate total amount */}</div>
          <form>
            {/* Payment form fields and validation */}
          </form>
          <button onClick={handleResetCart}>Start a New Shopping Session</button>
        </div>
      )}
    </div>
  );
};

export default App;
