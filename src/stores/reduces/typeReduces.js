// categoryProducts.js

import { READ_TYPE} from "../actionTypes";

const initialState = {
  Types: [],
};

const typeReduces = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case READ_TYPE:
      return {
        ...state,
        Types: payload,
      };
    default:
      return state;
  }
};

export default typeReduces;
