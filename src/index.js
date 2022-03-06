import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

// Store only has getState and setState. Hence its a pipeline structure. You can only set a state using the dispatch function
// console.log(store.getState());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
  	document.getElementById('root')
);