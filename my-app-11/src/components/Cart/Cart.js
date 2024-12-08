import { Fragment, useContext, useState } from 'react';
import useHttp from "../../hooks/use-http"

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const [loading, error, sendRequest] = useHttp();
  const [submitted, setSubmitted] = useState(false);

  const [checkout, setCheckout] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const checkoutHandler = () => {
    setCheckout(true);
    console.log("data is -- ", {
      items: cartCtx.items,
      totalAmount: cartCtx.totalAmount,
    })
  }

  const placeOrderHandler = async (userData) => {
    await sendRequest((response) => {
      console.log("order added successfully");
    },
    {
      url: "https://backend-store-9d74d-default-rtdb.firebaseio.com/orders.json",
      method: "POST",
      body: {
        userData,
        orderItems: cartCtx.items
      }
    });
    setSubmitted(true);
  }

  const closeModal = () => {
    setSubmitted(false);
    props.onClose();
  }

  const closeOrderPlaced = () => {
    closeModal();
    cartCtx.clearCart();
  }

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={closeModal}>
        Close
      </button>
      {hasItems && <button onClick={checkoutHandler} className={classes.button}>Order</button>}
    </div>
  )

  const cartModalData = <Fragment>
    {cartItems}
    <div className={classes.total}>
      <span>Total Amount</span>
      <span>{totalAmount}</span>
    </div>
    { checkout && <Checkout onConfirm={placeOrderHandler} onCancel={closeModal} /> }
    { !checkout && modalActions }
  </Fragment>

const orderSuccessAction = (
  <Fragment>
    <p>Order placed successfully</p>
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={closeOrderPlaced}>
        Close
      </button>
    </div>
  </Fragment>
)

  return (
    <Modal onClose={closeModal}>
      { !loading && !error && !submitted && cartModalData }
      { !loading && !error && submitted && orderSuccessAction }
      { loading && <p>Submitting order...</p> }
      { !loading && error && <p>{error}</p> }
    </Modal>
  );
};

export default Cart;
