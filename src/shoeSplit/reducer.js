import {
  ADD_SHOE_DEAL,
  SET_USER_LOCATION,
  MATCH_PARTNER,
  REMOVE_SHOE_DEAL,
  UPDATE_SHOE_DEAL
} from './types';

const initialState = {
  deals: [],
  userLocation: null,
  matches: {}
};

export const shoeSplitReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SHOE_DEAL:
      return {
        ...state,
        deals: [...state.deals, { ...action.payload, id: Date.now() }]
      };

    case SET_USER_LOCATION:
      return {
        ...state,
        userLocation: action.payload
      };

    case MATCH_PARTNER:
      return {
        ...state,
        matches: {
          ...state.matches,
          [action.payload.dealId]: action.payload.partnerId
        }
      };

    case REMOVE_SHOE_DEAL:
      return {
        ...state,
        deals: state.deals.filter(deal => deal.id !== action.payload)
      };

    case UPDATE_SHOE_DEAL:
      return {
        ...state,
        deals: state.deals.map(deal =>
          deal.id === action.payload.dealId
            ? { ...deal, ...action.payload.updates }
            : deal
        )
      };

    default:
      return state;
  }
};
