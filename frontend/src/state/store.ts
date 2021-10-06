import linkReducer from './reducers/linkReducer';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

export type RootState = ReturnType<typeof linkReducer>;

export default createStore(linkReducer, composeWithDevTools(
    applyMiddleware(thunk)
));