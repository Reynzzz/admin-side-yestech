// bannerReducer.js

import { READ_BANNER, READ_BANNER_BY_ID, ADD_BANNER, UPDATE_BANNER } from "../actionTypes";

const initialState = {
  Banner: [],
  BannerById: {},
};

const bannerReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case READ_BANNER:
      return {
        ...state,
        Banner: payload,
      };
    case READ_BANNER_BY_ID:
      return {
        ...state,
        BannerById: payload,
      };
      case UPDATE_BANNER:
      return {
        ...state,
        loading: false,
        banners: state.Banner.map((banner) =>
          banner.id === action.payload.id ? action.payload : banner
        ),
      };
    case ADD_BANNER:
      return {
        ...state,
        Banner: [...state.Banner, payload],
      };
    default:
      return state;
  }
};

export default bannerReducer;
