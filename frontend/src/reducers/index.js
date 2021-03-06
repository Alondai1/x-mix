import { combineReducers } from 'redux';
import ReviewReducer from './ReviewReducer'
import UserReducer from './UserReducer'
import SystemReducer from './SystemReducer';

const rootReducer = combineReducers({
  system: SystemReducer,
  review: ReviewReducer,
  user: UserReducer
})

export default rootReducer;