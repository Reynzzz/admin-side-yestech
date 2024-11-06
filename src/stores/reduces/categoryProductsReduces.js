// categoryProducts.js

import { READ_CATEGORY_PRODUCT} from "../actionTypes";

const initialState = {
  categoryProducts: [],
};

const categoryProductsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case READ_CATEGORY_PRODUCT:
      return {
        ...state,
        categoryProducts: payload,
      };
    default:
      return state;
  }
};

export default categoryProductsReducer;
