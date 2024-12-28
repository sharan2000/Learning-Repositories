import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css"

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink className={({isActive}) => {
              return isActive ? classes.active : undefined
             }} to="/" end>home</NavLink>
          </li>
          <li>
            <NavLink className={({isActive}) => {
              return isActive ? classes.active : undefined
             }} to="/products">products</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default MainNavigation;