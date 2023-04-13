import { combineReducers } from "redux";
import user, { sliceName as userSliceStore } from "./UserSlice"

const rootReducer = combineReducers({
    [userSliceStore]: user,
})
export default rootReducer;
