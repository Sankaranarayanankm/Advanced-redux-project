import { useEffect, useState } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector } from "react-redux";
import Notification from "./components/UI/Notification";
let initial = true;
function App() {
  const showCart = useSelector((state) => state.ui.showCart);
  const cart = useSelector((state) => state.cart);
  const [notification, setNotification] = useState({
    status: "",
    title: "",
    message: "",
  });
  useEffect(() => {
    const storeData = async () => {
      try {
        setNotification({
          status: "loading",
          title: "Sending...",
          message: "sending data to backend",
        });
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
        setNotification({
          status: "success",
          title: "Success",
          message: "Successfully posted your data",
        });
      } catch (error) {
        setNotification({
          status: "error",
          title: "Error",
          message: error,
        });
        console.log(error);
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
      {notification.status.length > 0 && <Notification {...notification} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
