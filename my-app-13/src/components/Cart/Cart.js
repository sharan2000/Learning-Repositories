import { useSelector } from 'react-redux';
import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
  const cartItems = useSelector(state => state.cart.items);

  let content = <li><p>No items found!</p></li>

  if(cartItems.length > 0) {
    content = cartItems.map(item => (
      <CartItem
        key={item.id}
        item={{ id: item.id, title: item.title, quantity: item.quantity, total: item.total, price: item.price }}
      />
    ))
  }

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>{ content }</ul>
    </Card>
  );
};

export default Cart;
