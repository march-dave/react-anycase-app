const initialState = {
  username: "dave",
  user: null,
  userCredits: {
    credits: 0,
    maxCredits: 0,
    plan: null
  },
  userInfo: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        username: action.user
      };
    case "SET_USER_CREDITS":
      return {
        ...state,
        userCredits: {
          ...action.credits
        }
      };
    case "SET_USER_INFO":
      return {
        ...state,
        userInfo: action.userInfo,
        user: action.userInfo
      };
    case "CONSUME_CREDITS":
      return {
        ...state,
        userCredits: {
          ...state.userCredits,
          credits: Math.max(0, state.userCredits.credits - action.amount)
        }
      };
    default:
      return state;
  }
};

export default reducer;
