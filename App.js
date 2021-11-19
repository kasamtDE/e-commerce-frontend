import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import AppContext from "./components/Context";
import Cart from "./components/Cart";

function App() {
  return (
    <div className="App">
      <AppContext>
        <Navbar />
        <Cart />
        <Home />
      </AppContext>
    </div>
  );
}

export default App;
