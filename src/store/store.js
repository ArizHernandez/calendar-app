import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { uiReducer } from '../reducers/uiReducer/uiReducer';
import { calendarReducer } from '../reducers/calendarReducer/calendarReducer';
import thunk from 'redux-thunk';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const reducers = combineReducers({
  ui: uiReducer,
  calendar: calendarReducer
})

export const store = createStore(
  reducers,
  composeEnhancers(  
    applyMiddleware(thunk)
  )
)