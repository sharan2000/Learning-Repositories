import { Fragment } from 'react';
import classes from './Header.module.css'
import mealsImg from '../../assets/meals.jpg'
import HeaderCartButton from './HeaderCartButton';


const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Healthy Meals</h1>
        <HeaderCartButton onClick={props.showCartHandler}>cart</HeaderCartButton>
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImg} alt='delicious food on the table'/>
      </div>
    </Fragment>
  )
} 



export default Header;