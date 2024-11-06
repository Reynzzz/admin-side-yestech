// categoryProducts.js

import { READ_CASELIST} from "../actionTypes";

const initialState = {
  CaseLists: [],
};

const CaseListReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case READ_CASELIST:
      return {
        ...state,
        CaseLists: payload,
      };
    default:
      return state;
  }
};

export default CaseListReducer;
