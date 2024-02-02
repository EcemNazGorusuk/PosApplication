import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import BillPage from "./pages/BillPage";
import CustomersPage from "./pages/CustomersPage";
import StatisticPage from "./pages/StatisticPage";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ProductPage from "./pages/ProductPage";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {

  //cart için localstorage
  const cart=useSelector((state)=>state.cart);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>

          <Route path="/register" element={<Register />}></Route>

          <Route
            path="/"
            element={
              <RouteControl>
                <HomePage />
              </RouteControl>
            }
          ></Route>

          <Route
            path="/cart"
            element={
              <RouteControl>
                <CartPage />
              </RouteControl>
            }
          ></Route>

          <Route
            path="/bills"
            element={
              <RouteControl>
                <BillPage />
              </RouteControl>
            }
          ></Route>

          <Route
            path="/customers"
            element={
              <RouteControl>
                <CustomersPage />
              </RouteControl>
            }
          ></Route>

          <Route
            path="/statistic"
            element={
              <RouteControl>
                <StatisticPage />
              </RouteControl>
            }
          ></Route>

          <Route
            path="/products"
            element={
              <RouteControl>
                <ProductPage />
              </RouteControl>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

/* ilk etapta eğer localde kullanıcı varsa / açılsın yoksa login açılsın */
export const RouteControl = ({ children }) => {
  if (localStorage.getItem("userStorage")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
