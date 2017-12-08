import { applyMiddleware, createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as reducers from './reducers';

const enhancers = composeWithDevTools({});

const configureStore = () => {
 const initialState = {};
 return createStore(
   combineReducers({...reducers}),
   initialState,
   enhancers()
 );
};

export default configureStore;
