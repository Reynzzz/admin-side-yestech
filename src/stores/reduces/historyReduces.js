// categoryProducts.js

import { READ_HISTORY} from "../actionTypes";

const initialState = {
  Historys: [],
};

const historyReduces = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case READ_HISTORY:
      return {
        ...state,
        Historys: payload,
      };
    default:
      return state;
  }
};

export default historyReduces;
