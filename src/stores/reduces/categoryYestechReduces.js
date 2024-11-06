// categoryProducts.js

import { READ_CATEGORY_YESTECH} from "../actionTypes";

const initialState = {
  categoryYestech: [],
};

const categoryYestechReducers = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case READ_CATEGORY_YESTECH:
      return {
        ...state,
        categoryYestech: payload,
      };
    default:
      return state;
  }
};

export default categoryYestechReducers;
