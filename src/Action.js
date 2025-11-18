export const setUser = user => {
  return {
    type: "SET_USER",
    user
  };
};

export const earnPoints = () => {
  return {
    type: "EARN_POINTS"
  };
};

export const resetDailyPoints = () => {
  return {
    type: "RESET_DAILY_POINTS"
  };
};

// Default export for backward compatibility
export default setUser;
