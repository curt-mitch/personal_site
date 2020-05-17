import * as ACTION_TYPES from '../actions/action_types';

const initialState = {
  is_authenticated: false,
  profile: null,
  db_profile: null,
};

const AuthReducer = (state = initialState, action) => {
  switch(action.type) {
    case ACTION_TYPES.SET_DB_PROFILE:
      return {
        ...state,
        db_profile: action.payload,
      };
    case ACTION_TYPES.REMOVE_DB_PROFILE:
      return {
        ...state,
        db_profile: null,
      };
    default:
      return state;
  }
};
