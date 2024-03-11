import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="headerContainer">
      <div className="siteHeader">
        <h1>LostNListed</h1>
      </div>
      <div>
        <Link to="/lost" className="navLinks">
          Lost
        </Link>
        <Link to="/found" className="navLinks">
          Found
        </Link>
        <Link to="/sell" className="navLinks">
          Sell
        </Link>
      </div>
    </div>
  );
};

export default Header;
