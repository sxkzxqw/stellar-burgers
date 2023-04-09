import { combineReducers } from "redux";
import user, { sliceName as userSliceStore } from "../features/UserSlice.js";

const rootReducer = combineReducers({
    [userSliceStore]: user,
})
export default rootReducer;
