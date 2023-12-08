import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/create">Create</Link></li>
        <li><Link to="/read">Read</Link></li>
        <li><Link to="/update">Update</Link></li>
        <li><Link to="/delete">Delete</Link></li>
        <li><Link to="/">About</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;