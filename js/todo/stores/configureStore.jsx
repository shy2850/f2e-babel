import { createStore } from 'redux';
import rootReducer from '../reducers/index';

export default function configureStore(initialState) {
  	const store = createStore(rootReducer, initialState, 
  		window.devToolsExtension && window.devToolsExtension()
  	);
  	return store;
}
