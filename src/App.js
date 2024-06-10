import { useEffect, useState } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./components/UI/Notification";
import { uiAction } from "./Store/uiSlice";
let initial = true;
function App() {
  const showCart = useSelector((state) => state.ui.showCart);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();
  console.log(notification);

  useEffect(() => {
    const storeData = async () => {
      dispatch(
        uiAction.handleNotification({
          status: "pending",
          title: "Sending...",
          message: "sending data to backend",
        })
      );
      try {
        const response = await fetch(
          "https://practice-b7928-default-rtdb.firebaseio.com/cart.json",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(cart),
          }
        );
        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error.message || "Failed to store data");
        }
        dispatch(
          uiAction.handleNotification({
            status: "success",
            title: "Success!",
            message: "Successully send data to backend",
          })
        );
      } catch (error) {
        dispatch(
          uiAction.handleNotification({
            status: "error",
            title: "Error",
            message: "Sending data failed",
          })
        );
      }
    };
    if (initial) {
      initial = false;
      return;
    }
    storeData();
  }, [cart]);
  return (
    <>
      {notification && <Notification {...notification} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
