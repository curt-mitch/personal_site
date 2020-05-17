import AuthReducer from './auth_reducer';
import PostsReducer from './posts_reducer';
import { combineReducers } from 'redux';

const RootReducer = combineReducers({
  auth_reducer: AuthReducer,
  posts_reducer: PostsReducer,
});

export default RootReducer;
