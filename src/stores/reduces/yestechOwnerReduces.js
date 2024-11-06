// categoryProducts.js

import { READ_YESTECH} from "../actionTypes";

const initialState = {
  Yestechs: [],
};

const yestechReduces = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case READ_YESTECH:
      return {
        ...state,
        Yestechs: payload,
      };
    default:
      return state;
  }
};

export default yestechReduces;
