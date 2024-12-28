import { Link } from "react-router-dom"

const PRODUCTS = [
  {id: "p1", name: "product-1"},
  {id: "p2", name: "product-2"},
  {id: "p3", name: "product-3"},
]

const Products = () => {
  return (
    <div>
      <p>This is products component</p>
      <ul>
      {
        PRODUCTS.map(product => (
          <li><Link to={product.id}>{product.name}</Link></li>
        ))
      }
      </ul>
    </div>
  )
}

export default Products