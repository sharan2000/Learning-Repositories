import { useSelector, useDispatch } from 'react-redux';
import classes from './Counter.module.css';
import { counterSliceActions } from "../store/counter"

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector(state => state.counter.counter);
  const show = useSelector(state => state.counter.displayCounter);

  const toggleCounterHandler = () => {
    dispatch(counterSliceActions.toggle());
  };

  const onIncrementHandler = () => {
    dispatch(counterSliceActions.increment()); // calling these functions will prepare an action object
  }
  const onIncreaseHandler = () => {
    dispatch(counterSliceActions.increase(10));  // { type: SOME_UNIQUE_IDENTIFIER, payload: 10 }
  }
  const onDecrementHandler = () => {
    dispatch(counterSliceActions.decrement());
  }

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      { show && <div className={classes.value}>{counter}</div> }
      <div>
        <button onClick={onIncrementHandler}>increment</button>
        <button onClick={onIncreaseHandler}>increase by 10</button>
        <button onClick={onDecrementHandler}>decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
