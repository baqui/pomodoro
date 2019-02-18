import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './root-reducer';

const enhancer = applyMiddleware(thunk);
const store = createStore(reducers, undefined, enhancer);

export default store;
