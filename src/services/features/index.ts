import { combineReducers } from "redux";
import user, { sliceName as userSliceStore } from "./UserSlice"
import { ordersReducer } from "./reducers/ordersPage/reducer";
import { feedReducer } from "./reducers/feedPage/reducer";

const rootReducer = combineReducers({
    [userSliceStore]: user,
    orderPage: ordersReducer,
    feedPage: feedReducer,
})
export default rootReducer;
