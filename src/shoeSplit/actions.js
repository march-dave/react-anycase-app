import {
  ADD_SHOE_DEAL,
  SET_USER_LOCATION,
  MATCH_PARTNER,
  REMOVE_SHOE_DEAL,
  UPDATE_SHOE_DEAL
} from './types';

export const addShoeDeal = (deal) => ({
  type: ADD_SHOE_DEAL,
  payload: deal
});

export const setUserLocation = (location) => ({
  type: SET_USER_LOCATION,
  payload: location
});

export const matchPartner = (dealId, partnerId) => ({
  type: MATCH_PARTNER,
  payload: { dealId, partnerId }
});

export const removeShoeDeal = (dealId) => ({
  type: REMOVE_SHOE_DEAL,
  payload: dealId
});

export const updateShoeDeal = (dealId, updates) => ({
  type: UPDATE_SHOE_DEAL,
  payload: { dealId, updates }
});
