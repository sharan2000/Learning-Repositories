import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import useHttp from '../../hooks/use-http';
import { useEffect, useState } from 'react';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  const [loading, error, sendRequest] = useHttp();

  useEffect(() => {
    sendRequest((responseData) => {
      let tempMeals = Object.entries(responseData).map(([id, data]) => (
        {
          id,
          ...data
        }
      ))

      setMeals(tempMeals);
    },
    {
      url: "https://backend-store-9d74d-default-rtdb.firebaseio.com/items.json",
      method: "GET"
    })
  }, []);


  let content = <p>No items available.</p>
  if(meals.length > 0) {
    content = meals.map((meal) => (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    ));
  }
  if(loading) {
    content = <p>Loading...</p>
  }
  if(error) {
    content = <p>{error}</p>
  }

  return (
    <section className={classes.meals}>
      <Card>
        { content }
      </Card>
    </section>
  );
};

export default AvailableMeals;
