/**
 * @file计数器面板
 */
import React, { Component, PropTypes } from 'react'

export default ({ increment, incrementIfOdd, incrementAsync, decrement, counter }) => {
  return (
    <p>
      Clicked: {counter} times
      {' '}
      <button onClick={increment}>+</button>
      {' '}
      <button onClick={decrement}>-</button>
      {' '}
      <button onClick={incrementIfOdd}>Increment if odd</button>
      {' '}
      <button onClick={()=>incrementAsync(3000)}>Increment async</button>
    </p>
  );
};