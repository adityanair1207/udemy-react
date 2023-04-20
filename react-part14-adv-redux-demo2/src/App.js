import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "./components/Layout/Layout";
import Cart from "./components/Cart/Cart";
import Products from "./components/Shop/Products";
import { useSelector } from "react-redux";
import { uiActions } from "./store/ui-slice";
import Notification from "./components/UI/Notification";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const cartIsVisible = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.notify({
          status: "pending",
          title: "Sending...",
          message: "Sending cart data.",
        })
      );

      const response = await fetch(
        "https://react-part10-http-requests-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT", // to overwrite existing cart data
          body: JSON.stringify(cart),
        }
      );
      console.log(response);

      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }

      const responseData = await response.json(); // we don't actually need this data
      console.log(responseData);

      dispatch(
        uiActions.notify({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully.",
        })
      );
    };

    if (isInitial) {
      isInitial = false;
      return; // so that cart doesn't get cleared on reload
    }

    sendCartData().catch((error) => {
      dispatch(
        uiActions.notify({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed.",
        })
      );
    }); // since sendCartData is async, it returns a promise. If error is thrown, it will go in catch()
  }, [cart, dispatch]); // now the effect will be executed whenever the cart changes and the cart will be updated by useSelector which sets up subscription to the redux store.

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {cartIsVisible && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
