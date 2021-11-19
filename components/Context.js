import React, { createContext, useState, useEffect } from "react";
import product1 from "../images/image-product-1.jpg";
import product2 from "../images/image-product-2.jpg";
import product3 from "../images/image-product-3.jpg";
import product4 from "../images/image-product-4.jpg";
export const myContext = createContext();
export default function AppContext({ children }) {
  const [current, setCurrent] = useState(0);
  const [cartProduct, setCartProduct] = useState([]);
  const [toggleCart, setToggleCart] = useState(false);
  const [count, setCount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCurrent, setModalCurrent] = useState(0);

  const [products, setProducts] = useState([
    product1,
    product2,
    product3,
    product4,
  ]);
  const [modalProduct, setModalProduct] = useState([
    product1,
    product2,
    product3,
    product4,
  ]);

  const previousProduct = () => {
    setCurrent(current === 0 ? products.length - 1 : current - 1);
  };
  const nextProduct = () => {
    setCurrent(current === products.length - 1 ? 0 : current + 1);
  };

  const handleClick = (sign) => {
    if (sign === "minus") {
      if (count <= 0) {
        return 0;
      }
      setCount(count - 1);
    } else {
      setCount(count + 1);
    }
  };

  function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      cartIconX: undefined,
    });
    useEffect(() => {
      function handleResize() {
        const cartIcon = document.querySelector(".cart-icon");
        const cartIconX = cartIcon.getBoundingClientRect().x;
        setWindowSize({
          width: window.innerWidth,
          cartIconX: cartIconX,
        });
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
  }
  const size = useWindowSize();

  const toggleModal = (index) => {
    setModalOpen(true);
    setModalCurrent(index);
  };
  return (
    <myContext.Provider
      value={{
        current,
        products,
        count,
        cartProduct,
        toggleCart,
        size,
        setToggleCart,
        setCartProduct,
        setCurrent,
        setCount,
        previousProduct,
        nextProduct,
        handleClick,
        modalOpen,
        setModalOpen,
        toggleModal,
        modalProduct,
        setModalProduct,
        modalCurrent,
        setModalCurrent,
      }}
    >
      {children}
    </myContext.Provider>
  );
}
