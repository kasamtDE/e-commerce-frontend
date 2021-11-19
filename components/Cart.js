import React, { useContext } from "react";
import { myContext } from "./Context";
import "../styling/Cart.css";
import firebase from "../firebase";
import remove from "../images/icon-delete.svg";

export default function Cart() {
  const {products, toggleCart, cartProduct } = useContext(myContext);

  const ref = firebase.firestore().collection("products");

  const deleteCartProduct = () => {
    ref.get().then((querySnapShot) => {
      querySnapShot.docs.forEach((doc) => {
        return doc.ref.delete();
      });
    });
  };

  return (
    <div className={toggleCart ? "cart-container show" : "cart-container"}>
      <div className="cart-header">
        <h2> Cart </h2>
      </div>
      <div className="cart-detailed-container">
        {cartProduct.length <= 0 ? (
          <div className="cart-info-container empty "> Your cart is empty </div>
        ) : (
          <div className="cart-info-container ">
            <img
              className="cart-product-image"
              alt="cart-product-image"
              src={products[0]}
            />
            <div className="count-info">
              <div> Fall limited edition Sneakers </div>
              <div>
                {" "}
                $125.00 x{" "}
                {cartProduct.length > 0
                  ? cartProduct
                      .map((product) => product.count)
                      .reduce((prev, current) => prev + current)
                  : ""}{" "}
                = $
                {cartProduct.length > 0
                  ? cartProduct
                      .map((product) => product.count)
                      .reduce((prev, current) => prev + current) * 125
                  : ""}{" "}
              </div>
            </div>
            <img
              className="delete"
              src={remove}
              onClick={() => deleteCartProduct()}
            />
          </div>
        )}
      </div>
    </div>
  );
}
