// categoryProducts.js

import { READ_NEWS} from "../actionTypes";

const initialState = {
  News: [],
};

const newsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case READ_NEWS:
      return {
        ...state,
        News: payload,
      };
    default:
      return state;
  }
};

export default newsReducer;
