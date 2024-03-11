import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="headerContainer">
      <div className="siteHeader">
        <Link to="/" className="siteTitle">
          LostNListed
        </Link>
      </div>
      <div>
        <Link to="/posts/type/lost" className="navLinks">
          Lost
        </Link>
        <Link to="/posts/type/found" className="navLinks">
          Found
        </Link>
        <Link to="/posts/type/sell" className="navLinks">
          Sell
        </Link>
      </div>
    </div>
  );
};

export default Header;
