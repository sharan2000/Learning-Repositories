import styles from './Card.module.css'

let Card = (props) => {
  return (
    <div className={`${styles['card']} ${props.className}`}>{props.children}</div>
  )
}


export default Card