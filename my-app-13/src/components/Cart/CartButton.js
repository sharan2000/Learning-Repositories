import { uiActions } from '../../store/ui-slice';
import classes from './CartButton.module.css';
import { useSelector, useDispatch } from "react-redux"

const CartButton = (props) => {
  const dispatch = useDispatch();
  const totalQuantity = useSelector(state => state.cart.totalQuantity);

  const toggleCart = () => {
    dispatch(uiActions.toggleCart());
  }

  return (
    <button onClick={toggleCart} className={classes.button}>
      <span>My Cart</span>
      {totalQuantity > 0 && <span className={classes.badge}>{totalQuantity}</span>}
    </button>
  );
};

export default CartButton;
