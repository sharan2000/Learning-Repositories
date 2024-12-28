import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();

  return <p>Product is {params.product_id}</p>
}

export default ProductDetails;