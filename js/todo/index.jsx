import React from 'react';
import { render as DomRender } from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import configureStore from './stores/configureStore';

const store = configureStore();

export const render = (id) => {
	DomRender(
	  <Provider store={store}>
	    <App />
	  </Provider>,
	  document.getElementById(id)
	);
};
