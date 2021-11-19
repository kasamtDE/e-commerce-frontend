import React, { useState, useContext, useEffect } from "react";
import "../styling/Navbar.css";
import logo from "../images/logo.svg";
import menu from "../images/icon-menu.svg";
import cart from "../images/icon-cart.svg";
import avatar from "../images/image-avatar.png";
import close from "../images/icon-close.svg";
import { myContext } from "./Context";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);

  const { toggleCart, setToggleCart, cartProduct, size, setModalOpen } =
    useContext(myContext);

  useEffect(() => {
    const cartContainer = document.querySelector(".cart-container");
    if (size.width >= 1050) {
      setOpenMenu(true);
      cartContainer.style.left = `${size.cartIconX}px`;
    } else {
      cartContainer.style.left = "";
      setModalOpen(false);
    }
  }, [size.width]);

  return (
    <div className="navbar">
      <nav>
        <div className="navbar-left">
          <img
            className="menu"
            src={menu}
            onClick={() => setOpenMenu(!openMenu)}
          />
          <img className="logo" src={logo} />
        </div>
        <ul className={openMenu ? "nav-mid open-menu" : "nav-mid"}>
          <div>
            <img
              className="close"
              src={close}
              onClick={() => setOpenMenu(!openMenu)}
            />
          </div>
          <div className="menu-items">
            <li>Collections</li>
            <li>Men</li>
            <li>Women</li>
            <li>About</li>
            <li>Contact</li>
          </div>
        </ul>
        <div className="navbar-right">
          <div className="cart-icon-container">
            {cartProduct.length > 0
              ? cartProduct
                  .map((product) => product.count)
                  .reduce((prev, current) => prev + current) > 0 && (
                  <div
                    className="get-cart-count"
                    onClick={() => setToggleCart(!toggleCart)}
                  >
                    {" "}
                    {cartProduct.length > 0
                      ? cartProduct
                          .map((product) => product.count)
                          .reduce((prev, current) => prev + current)
                      : ""}{" "}
                  </div>
                )
              : ""}
            <img
              className="cart-icon"
              src={cart}
              onClick={() => setToggleCart(!toggleCart)}
            />
          </div>
          <img className="avatar" src={avatar} />
        </div>
      </nav>
    </div>
  );
}
