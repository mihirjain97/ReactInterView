import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import AuthReducers from './reducers/AuthReducers';

const loggerMiddleware = (store) => (next) => (action) => {
    console.log('dispatching action', action);
    console.log('before dispatching state', store.getState());
    let result = next(action);
    setTimeout(() => {
        console.log('dispatch time out');
    }, 5000);
    console.log('next state', store.getState());
    return result;
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = applyMiddleware(thunk)


const reducers = combineReducers(
    {
        auth: AuthReducers,
    }
)

export const store = createStore(reducers, composeEnhancers(middleware));


