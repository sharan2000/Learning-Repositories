import { Fragment, useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector } from 'react-redux';
import Notification from './components/UI/Notification ';
import { useDispatch } from 'react-redux';
import { fetchCartData, sendCartData } from './store/cart-actions';

let initalLoad = true;

function App() {
  const showCart = useSelector(state => state.ui.showCart);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch])

  useEffect(() => {
    if(initalLoad) {
      initalLoad = false;
      return;
    }
    if(cart.changed) {
      dispatch(sendCartData({
        items: cart.items,
        totalQuantity: cart.totalQuantity
      }));
    }
  }, [cart, dispatch])

  return (
    <Fragment>
      { notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Layout>
        { showCart && <Cart /> }
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
