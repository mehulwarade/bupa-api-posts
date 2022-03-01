import { createStore } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension'

// Basically Reducer has all the data, hence the reducer is very important for store.
import postReducer from './posts.reducer'

// createStore is higher order function as it takes a function as parameter.
const store = createStore(postReducer, composeWithDevTools());

export default store;