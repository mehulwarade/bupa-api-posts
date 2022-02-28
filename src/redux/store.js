import { createStore } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import posts_reducer from './reducers/posts.reducer'


export const store = createStore(posts_reducer, composeWithDevTools());