import {
    legacy_createStore as createStore,
    applyMiddleware,
    combineReducers,
  } from "redux";
  import { thunk } from "redux-thunk";
import bannerReduces from "./reduces/bannerReduces";
import categoryProductsReducer from "./reduces/categoryProductsReduces";
import ProductsReducer from "./reduces/productsReducer";
import newsReducer from "./reduces/newsReduces";
import CaseListReducer from "./reduces/caseListReduces";
import typeReduces from "./reduces/typeReduces";
import yestechReduces from "./reduces/yestechOwnerReduces";
import categoryYestechReducers from "./reduces/categoryYestechReduces";
import warehouseReducer from "./reduces/warehouseReduces";
import historyReduces from "./reduces/historyReduces";


  
const combinedReducers = combineReducers({
    Banner : bannerReduces,
    categoryProducts:categoryProductsReducer,
    Products : ProductsReducer,
    News : newsReducer,
    CaseLists : CaseListReducer,
    Types : typeReduces,
    Yestechs : yestechReduces,
    categoryYestech : categoryYestechReducers,
    Warehouses : warehouseReducer,
    Historys : historyReduces
})

const store = createStore(combinedReducers, applyMiddleware(thunk));

export default store;