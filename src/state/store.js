import { configureStore, combineReducers } from '@reduxjs/toolkit';

import tutorialReducer from './tutorial';
import serverListReducer from './serverList';
import illegalActivityReducer from './illegalActivity';
import fileStateReducer from './fileState';

const rootReducer = combineReducers({
  tutorial: tutorialReducer,
  serverList: serverListReducer,
  illegalActivity: illegalActivityReducer,
  fileState: fileStateReducer
});

const store = configureStore({
  reducer: rootReducer
});

export default store;
