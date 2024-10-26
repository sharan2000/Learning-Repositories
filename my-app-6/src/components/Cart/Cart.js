import { useContext } from 'react';
import Modal from '../UI/Modal';
import classes from './Cart.module.css'
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';

const Cart = (props) => {
  let cartContext = useContext(CartContext)

  let totalAmount = `$${cartContext.totalAmount.toFixed(2)}`
  let hasItems = cartContext.items.length > 0

  const cartItemRemoveHandler = (id) => {
    cartContext.removeItem(id)
  }
  const cartItemAddHandler = (item) => {
    cartContext.addItem({
      ...item,
      amount: 1
    })
  }

  let cartItems = 
    <ul className={classes['cart-items']}>
      {
        cartContext.items.map((item) => 
        <CartItem 
          key={item.id} 
          price={item.price} 
          name={item.name} 
          amount={item.amount} 
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />)
      }
    </ul>

  return (
    <Modal closeModal={props.hideCartHandler}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes['actions']}>
        <button className={classes['button--alt']} onClick={props.hideCartHandler}>Close</button>
        { hasItems ? <button className={classes['button']}>Order</button> : '' }
      </div>
    </Modal>
  )
}

export default Cart;