import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(uiActions.setNotification({
      title: "pending",
      message: "data sending to server"
    }));
    const sendItems = async () => {
      let response = await fetch("https://backend-store-9d74d-default-rtdb.firebaseio.com/cart.json", {
        method: "PUT",
        body: JSON.stringify(cart)
      })
      if(!response.ok) {
        throw new Error("Faild to send data to server");
      }
    }

    try {
      await sendItems();
      dispatch(uiActions.setNotification({
        status: "success",
        title: "successful",
        message: "data sent to the server successfully"
      }));
    } catch (error) {
      dispatch(uiActions.setNotification({
        status: "error",
        title: "failure",
        message: "error occured when sending data to server"
      }));
    }
  }
}


export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch("https://backend-store-9d74d-default-rtdb.firebaseio.com/cart.json");
      if(!response.ok) {
        throw new Error("Unable to fetch cart data");
      }

      const data = await response.json()
      return data;
    }

    try {
      const data = await fetchData();
      dispatch(cartActions.replace({
        items: data.items || [],
        totalQuantity: data.totalQuantity
      }));
    } catch (error) {
      dispatch(uiActions.setNotification({
        status: "error",
        title: "failure",
        message: "Unable to fetch cart data"
      }));
    }
  }
}