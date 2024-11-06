// categoryProducts.js

import { READ_PRODUCTS,READ_DETAIL_PRODUCT} from "../actionTypes";

const initialState = {
  Products: [],
  product : {}
};

const ProductsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case READ_PRODUCTS:
      return {
        ...state,
        Products: payload,
      };
      case READ_DETAIL_PRODUCT:
      return {
        ...state,
        product: payload,
      };
    default:
      return state;
  }
};

export default ProductsReducer;
