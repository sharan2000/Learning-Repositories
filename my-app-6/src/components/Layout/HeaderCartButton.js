import classes from './HeaderCartButton.module.css'
import CartIcon from '../Cart/CartIcon'
import { useContext, useEffect, useState } from 'react'
import CartContext from '../../store/cart-context'

const HeaderCartButton = (props) => {
  const [showCartButtonAnimation, setShowCartButtonAnimation] = useState(false)

  const cartContext = useContext(CartContext);
  const numberOfItems = cartContext.items.reduce((sum, item) => sum + item.amount, 0)

  const buttonClasses = `${classes.button} ${showCartButtonAnimation ? classes.bump : ''}`

  useEffect(() => {
    if(cartContext.items.length < 1) {
      return
    }
    setShowCartButtonAnimation(true)
    const timeoutId = setTimeout(() => {
      setShowCartButtonAnimation(false)
    }, 300)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [cartContext.items])


  return (
    <button onClick={props.onClick} className={buttonClasses}>
      <span className={classes.icon}><CartIcon /></span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfItems}</span>
    </button>
  )
}


export default HeaderCartButton;

