import React, { useState } from 'react';
import productsData from './products.json'; // Import the JSON data

const App = () => {
  const [view, setView] = useState('browse');
  const [cart, setCart] = useState({});
  const [search, setSearch] = useState('');

  //Payment method fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [card, setCard] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");


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

    //Validate fields here
    if (!email.includes("@") || !email.includes(".") ) {
      alert("Not a valid email address!");
      return;
    }
    else if ((card.length !== 16) || (!/^\d+$/.test(card))) {
      alert("Not a valid credit/debit card!");
      return;
    }
    else if (address === "") {
      alert("Not a valid address!");
      return;
    }
    else if (city === "") {
      alert("Not a valid city!");
      return;
    }
    else if (state.length !== 2) {
      alert("Not a valid state!");
      return;
    }
    else if ((zip.length !== 5) || (!/^\d+$/.test(zip))) {
      alert("Not a valid ZIP code!");
      return;
    }
    // if all fields are good
    setView('confirmation');
  };

  const handleResetCart = () => {
    setCart({});
    setView('browse');

    setFullName("");
    setEmail("");
    setCard("");
    setAddress("");
    setCity("");
    setState("");
    setZip("");
  };

  const getTotal = () => {
    let total = 0;
    for (const productId in cart) {
      const product = products.find((p) => p.id === parseInt(productId));
      total += cart[productId] * product.price;
    }
    return total;
  };

  const getTotalWithTax = () => {
    let total = 0;
    for (const productId in cart) {
      const product = products.find((p) => p.id === parseInt(productId));
      total += cart[productId] * product.price;
    }
    return total * 1.06;
  };

  return (
    <div className="container">
      <h1 className='display-1 mt-4 mb-3'>Cooler Walmart</h1>

      {view === 'browse' && (
        <div>
          <div className = "d-flex justify-content-between mt-4 border border-dark rounded p-2 bg-secondary bg-gradient">
            <input className=''
              type="text"
              placeholder="Search products"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className = "btn btn-primary" onClick={handleCheckout}>Go to Cart</button>
          </div>
          <div className="row row-cols-lg-3 mt-4 m-2 p-1 g-5">
            {products
              .filter((product) =>
                product.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((product) => (
                <div className="col mt-5 " key={product.id}>
                  <div className=''>
                    <img src={require(`./images/${product.image}`)} alt={product.name} height = "140px" width = "190px;"/>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p className='text-secondary'>${product.price}</p>
                    <button className = "btn btn-secondary" onClick={() => handleAddToCart(product.id)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {view === 'cart' && (
        <div>
          <h2>Cart View</h2>
          {Object.keys(cart).map((productId) => (
            <div key={productId}>
              <div>
                {products.find((product) => product.id === Number(productId)).name}
                <br></br>
                <img src={require(`./images/${products.find((product) => 
                  product.id === Number(productId)).image}`)} alt={products.find((product) => 
                  product.id === Number(productId)).name} height = "70px" width = "95px;"/>
              </div>
              <div>Quantity: {cart[productId]}</div>
              <div>Price: {cart[productId] * products.find((product) => product.id === Number(productId)).price}</div>
              <button onClick={() => handleRemoveFromCart(productId)}>Remove</button>
            </div>
          ))}
          <div>All items: ${getTotal().toFixed(2)}</div>
          <div><h3>Total (with 6% IA sales tax): ${getTotalWithTax().toFixed(2)}</h3></div>
          <div>
            <h4>Payment Information</h4>
            <p>Full Name</p>
            <input className="full_name"
              type="text"
              placeholder="Full Name"
              onChange={(e) => setFullName(e.target.value)}
            />
            <br></br><br></br>
            <p>Email</p>
            <input className='email'
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br></br><br></br>
            <p>Card</p>
            <input className='card'
              type="text"
              placeholder="Card"
              onChange={(e) => setCard(e.target.value)}
            />
            <br></br>
            <p>Address</p>
            <input className='address'
              type="text"
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
            />
            <br></br><br></br>
            <p>City</p>
            <input className='city'
              type="text"
              placeholder="City"
              onChange={(e) => setCity(e.target.value)}
            />
            <br></br><br></br>
            <p>State</p>
            <input className='state'
              type="text"
              placeholder="State"
              onChange={(e) => setState(e.target.value)}
            />
            <br></br><br></br>
            <p>ZIP</p>
            <input className='zip'
              type="text"
              placeholder="ZIP"
              onChange={(e) => setZip(e.target.value)}
            />
          </div>
          <br></br>
          <button onClick={handleOrder}>Order</button>
          <button onClick={handleResetCart}>Back to Browse</button>
        </div>
      )}

      {view === 'confirmation' && (
        <div>
          <h2>Confirmation View</h2>
          <h3>Order successfully placed!</h3>
          {Object.keys(cart).map((productId) => (
            <div key={productId}>
              <img src={require(`./images/${products.find((product) => 
                  product.id === Number(productId)).image}`)} alt={products.find((product) => 
                  product.id === Number(productId)).name} height = "70px" width = "95px;"/>
              <div>
                {products.find((product) => product.id === Number(productId)).name}
              </div>
              <div>Quantity: {cart[productId]}</div>
            </div>
          ))}
          <div>Total: ${getTotalWithTax().toFixed(2)}</div>

          <div>
            <h3>Order Details</h3>
            <p><b>Full Name: </b>{fullName}</p>
            <p><b>Email Address: </b>{email}</p>
            <p><b>Card: </b>{card}</p>
            <p><b>Address: </b>{address}</p>
            <p><b>City: </b>{city}</p>
            <p><b>State: </b>{state}</p>
            <p><b>Zip: </b>{zip}</p>
          </div>


          <button onClick={handleResetCart}>Start a New Shopping Session</button>
        </div>
      )}
    </div>
  );
};

export default App;
