export const setUser = user => {
  return {
    type: "SET_USER",
    user
  };
};

export const setUserCredits = credits => {
  return {
    type: "SET_USER_CREDITS",
    credits
  };
};

export const setUserInfo = userInfo => {
  return {
    type: "SET_USER_INFO",
    userInfo
  };
};

export const consumeCredits = amount => {
  return {
    type: "CONSUME_CREDITS",
    amount
  };
};

export default setUser;
