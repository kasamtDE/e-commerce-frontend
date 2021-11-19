import React, {  useEffect } from "react";
import "../styling/Home.css";
import next from "../images/icon-next.svg";
import previous from "../images/icon-previous.svg";
import cart from "../images/icon-cart.svg";
import minus from "../images/icon-minus.svg";
import plus from "../images/icon-plus.svg";
import { useContext } from "react";
import { myContext } from "./Context";
import firebase from "../firebase";
import { v4 as uuidv4 } from "uuid";
import Modal from "./Modal";

export default function Home() {
  const {
    current,
    products,
    previousProduct,
    nextProduct,
    handleClick,
    count,
    setCount,
    setCartProduct,
    toggleModal,
    modalOpen,
    setModalOpen,
  } = useContext(myContext);

  const ref = firebase.firestore().collection("products");

  const addProduct = (items) => {
    setCartProduct(items);
    setCount(0);
  };

  const getCartProducts = () => {
    ref.onSnapshot((querySnapShot) => {
      const items = [];
      querySnapShot.forEach((doc) => {
        items.push(doc.data());
      });
      addProduct(items);
    });
  };
  useEffect(() => {
    getCartProducts();
  }, []);
  const addToCart = (product) => {
    if (product.count <= 0) {
      return;
    }
    ref
      .doc(product.id)
      .set(product)
      .catch((err) => {
        console.log(err);
      });

    getCartProducts();
  };

  return (
    <div className="home-container">
      <div className="sneaker-container">
        <div className="product-image-container">
          <div className="circle arrow first" onClick={() => previousProduct()}>
            <img src={previous} />
          </div>
          <div className="circle arrow second" onClick={() => nextProduct()}>
            <img src={next} />
          </div>
          {products.map((product, index) => {
            return (
              <div key = {index}
                className={
                  index === current
                    ? "image-container active"
                    : "image-container not-active"
                }
              >
                <img className="product" src={product} />
              </div>
            );
          })}
          <div className="preview-images-container">
            {products.map((product, index) => {
              return (
                <img key = {product}
                  onClick={() => toggleModal(index)}
                  className="preview-images"
                  src={product}
                  width="75px"
                />
              );
            })}
            <Modal
              open={modalOpen}
              closeModal={() => setModalOpen(false)}
            ></Modal>
          </div>
        </div>

        <div className="sneaker-text-container">
          <h3 className="sneaker-company">Sneaker Company </h3>
          <h1 className="sneaker-banner"> Fall Limited Edition Sneakers </h1>

          <p className="sneaker-text">
            {" "}
            These low-profile sneakers are your perfect casual wear companion.
            Featuring a durable rubber outer sole, they’ll withstand everything
            the weather can offer.
          </p>
          <div className="pricing">
            <h4 className="price">$125.00</h4>
            <div className="discount">50%</div>
            <div className="real-price">$250.00</div>
          </div>
          <div className="cart-count-container">
            <div className="cart-count">
              <img src={minus} onClick={() => handleClick("minus")} />
              <div className="count"> {count}</div>
              <img src={plus} onClick={() => handleClick("plus")} />
            </div>
            <div
              className="add-cart"
              onClick={() => addToCart({ count: count, id: uuidv4() })}
            >
              <img src={cart} />
              <p> Add to cart </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
