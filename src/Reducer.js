import { combineReducers } from 'redux';
import { shoeSplitReducer } from './shoeSplit/reducer';

const initialState = {
  username: "dave"
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        username: action.user
      };
    default:
      return state;
  }
};

const reducer = combineReducers({
  user: userReducer,
  shoeSplit: shoeSplitReducer
});

export default reducer;
