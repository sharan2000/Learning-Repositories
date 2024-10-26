import { useReducer } from "react"
import CartContext from "./cart-context"

const defaultCartState = {
  items: [],
  totalAmount: 0
}

const CartReducer = (state, action) => {
  if(action.type === 'ADD') {
    const updatedAmount = +(state.totalAmount + action.item.amount * action.item.price).toFixed(2)
    let updatedItems
    
    let existingIndex = state.items.findIndex(ele => ele.id === action.item.id)
    let existingElement = state.items[existingIndex]

    if(existingElement) {
      let updatedElement = {
        ...existingElement,
        amount: existingElement.amount + action.item.amount
      }
      updatedItems = [...state.items]
      updatedItems[existingIndex] = updatedElement
    } else {
      updatedItems = state.items.concat(action.item)
    }
    
    return {
      items: updatedItems,
      totalAmount: updatedAmount
    }
  }
  else if(action.type === 'REMOVE') {
    const existingItemIndex = state.items.findIndex(obj => obj.id === action.id)
    const exsitingItem = state.items[existingItemIndex]

    const updatedTotalAmount = state.totalAmount - exsitingItem.price
    let updatedItems
    if(exsitingItem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id)
    } else {
      const updatedItem = {
        ...exsitingItem,
        amount: exsitingItem.amount - 1
      }
      updatedItems = [...state.items]
      updatedItems[existingItemIndex] = updatedItem
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }

  return defaultCartState
}

const CartProvider = (props) => {
  const [cartState, dispatcher] = useReducer(CartReducer, defaultCartState)

  const addItemToCartHandler = (item) => {
    dispatcher({
      type: "ADD",
      item: item
    })
  }

  const removeItemFromCartHandler = (id) => {
    dispatcher({
      type: "REMOVE",
      id: id
    })
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler
  }

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider