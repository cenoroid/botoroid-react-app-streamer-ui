import { combineReducers } from "redux";
import entitiesReducer from "./entities";

import appConfigReducer from "./appConfig";

export default combineReducers({
  entities: entitiesReducer,
  appConfig: appConfigReducer,
});
