import { combineReducers } from "redux";
import user, { sliceName as userSliceStore } from "./UserSlice"
import { liveTableReducer } from "./websocket/reducer";

const rootReducer = combineReducers({
    [userSliceStore]: user,
    liveTable: liveTableReducer
})
export default rootReducer;
