// Load initial points state from localStorage
const loadPointsState = () => {
  try {
    const savedData = localStorage.getItem('pointsData');
    if (savedData) {
      const data = JSON.parse(savedData);
      const today = new Date().toDateString();

      // Reset daily points if it's a new day
      if (data.lastResetDate !== today) {
        return {
          points: data.totalPoints || 0,
          totalPoints: data.totalPoints || 0,
          dailyPoints: 0,
          lastResetDate: today,
          searchCount: 0
        };
      }

      return data;
    }
  } catch (error) {
    console.error('Error loading points data:', error);
  }

  return {
    points: 0,
    totalPoints: 0,
    dailyPoints: 0,
    lastResetDate: new Date().toDateString(),
    searchCount: 0
  };
};

const pointsState = loadPointsState();

const initialState = {
  username: "dave",
  ...pointsState
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        username: action.user
      };

    case "EARN_POINTS":
      const today = new Date().toDateString();
      const isNewDay = state.lastResetDate !== today;

      // Reset daily points if new day
      const currentDailyPoints = isNewDay ? 0 : state.dailyPoints;
      const currentSearchCount = isNewDay ? 0 : state.searchCount;

      // Check if daily limit reached (90 points = 30 searches)
      if (currentDailyPoints >= 90) {
        return state;
      }

      const pointsToAdd = Math.min(3, 90 - currentDailyPoints);
      const newDailyPoints = currentDailyPoints + pointsToAdd;
      const newTotalPoints = (isNewDay ? state.totalPoints : state.totalPoints) + pointsToAdd;
      const newSearchCount = currentSearchCount + 1;

      const newState = {
        ...state,
        points: newTotalPoints,
        totalPoints: newTotalPoints,
        dailyPoints: newDailyPoints,
        searchCount: newSearchCount,
        lastResetDate: today
      };

      // Save to localStorage
      try {
        localStorage.setItem('pointsData', JSON.stringify({
          points: newState.points,
          totalPoints: newState.totalPoints,
          dailyPoints: newState.dailyPoints,
          lastResetDate: newState.lastResetDate,
          searchCount: newState.searchCount
        }));
      } catch (error) {
        console.error('Error saving points data:', error);
      }

      return newState;

    case "RESET_DAILY_POINTS":
      const resetState = {
        ...state,
        dailyPoints: 0,
        searchCount: 0,
        lastResetDate: new Date().toDateString()
      };

      try {
        localStorage.setItem('pointsData', JSON.stringify({
          points: resetState.points,
          totalPoints: resetState.totalPoints,
          dailyPoints: resetState.dailyPoints,
          lastResetDate: resetState.lastResetDate,
          searchCount: resetState.searchCount
        }));
      } catch (error) {
        console.error('Error saving points data:', error);
      }

      return resetState;

    default:
      return state;
  }
};

export default reducer;
