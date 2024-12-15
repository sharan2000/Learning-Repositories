import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {
    id: 1,
    title: 'Chocolate',
    price: 6,
    description: 'Tasty milk chocolate.',
  },
  {
    id: 2,
    title: 'Olives',
    price: 10,
    description: 'fresh green olives.',
  }
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        { DUMMY_PRODUCTS.map(item => 
          <ProductItem
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            description={item.description}
          />
        ) }
        
      </ul>
    </section>
  );
};

export default Products;
