import { createSlice } from '@reduxjs/toolkit';
import LocalStorage from '../../helpers/scripts/localStorage';

let initialState = {};

// Check if we have data from localStorage
const data = JSON.parse(LocalStorage.get('interpolStart'));
if (data) {
  initialState = data.serverList;
} else {
  // if we don't, start at tutorial one, step one
  initialState = {
    connection: false
  };
}

// Slices
const serverListSlice = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    setServerListConnection: (state, action) => {
      const { payload } = action;
      state.connection = payload;
      const currentStorage = JSON.parse(LocalStorage.get('interpolStart'));
      LocalStorage.set('interpolStart', JSON.stringify({ ...currentStorage, serverList: state }));
    }
  }
});

// Reducers
export default serverListSlice.reducer;

// Selectors
export const serverListSelector = (state) => state.serverList.connection;

// Actions
const { setServerListConnection } = serverListSlice.actions;

// Thunks
export const setConnection = (connection) => (dispatch) => {  
  dispatch(setServerListConnection(connection));
};