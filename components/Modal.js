import React, { useContext } from "react";
import ReactDOM from "react-dom";
import close from "../images/icon-close.svg";
import "../styling/Modal.css";
import { myContext } from "./Context";
import next from "../images/icon-next.svg";
import previous from "../images/icon-previous.svg";

export default function Modal({ open, children, closeModal }) {
  const { products, modalProduct, modalCurrent, setModalCurrent } =
    useContext(myContext);

  const previousProductModal = () => {
    setModalCurrent(
      modalCurrent === 0 ? products.length - 1 : modalCurrent - 1
    );
  };
  const nextProductModal = () => {
    setModalCurrent(
      modalCurrent === products.length - 1 ? 0 : modalCurrent + 1
    );
  };
  if (!open) return null;

  const OVERLAY_STYLES = {
    position: "fixed",
    top: "0px",
    bottom: "0px",
    left: "0px",
    right: "0px",
    backgroundColor: "rgba(0,0,0,0.7)",
    zIndex: 10000,
  };
  return ReactDOM.createPortal(
    <>
      <div>
        <div className="overlay" style={OVERLAY_STYLES}></div>
        <div className="modal-product-container">
          <img className="close-modal" src={close} onClick={closeModal} />
          {modalProduct.map((product, index) => {
            return (
              <img
                className={
                  index === modalCurrent
                    ? "modal-product active"
                    : "modal-product"
                }
                src={product}
              />
            );
          })}
          <div className="lightbox-modal-container">
            {modalProduct.map((product, index) => (
              <img
                onClick={() => setModalCurrent(index)}
                className={
                  index === modalCurrent
                    ? "lightbox-modal lightbox-current"
                    : "lightbox-modal"
                }
                src={product}
              />
            ))}
          </div>
          <div
            className="modal-arrow arrow-first"
            onClick={() => previousProductModal()}
          >
            <img src={previous} />
          </div>
          <div
            className="modal-arrow arrow-second"
            onClick={() => nextProductModal()}
          >
            <img src={next} />
          </div>
        </div>
        {children}
      </div>
    </>,
    document.querySelector("#portal")
  );
}
