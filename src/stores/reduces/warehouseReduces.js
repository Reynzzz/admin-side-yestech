// categoryProducts.js

import { READ_WAREHOUSE} from "../actionTypes";

const initialState = {
  Warehouses: [],
};

const warehouseReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case READ_WAREHOUSE:
      return {
        ...state,
        Warehouses: payload,
      };
    default:
      return state;
  }
};

export default warehouseReducer;
