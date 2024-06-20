import { createSlice } from '@reduxjs/toolkit';
import LocalStorage from '../../helpers/scripts/localStorage';

let initialState = {
  isIllegal: false,
  hasVirus: false
};

// Check if we have data from localStorage
const data = JSON.parse(LocalStorage.get('interpolStart'));
if (data) {
  initialState = data.illegalActivity;
} else {
  // if we don't, start at tutorial one, step one
  initialState = {
    isIllegal: false,
    hasVirus: false
  };
}

// Slices
const illegalActivitySlice = createSlice({
  name: 'isIllegal',
  initialState,
  reducers: {
    setIllegalActivity: (state, action) => {
      const { payload } = action;
      state.isIllegal = payload;
      const currentStorage = JSON.parse(LocalStorage.get('interpolStart'));
      LocalStorage.set('interpolStart', JSON.stringify({ ...currentStorage, illegalActivity: state }));
    },
    setVirus: (state, action) => {
      const { payload } = action;
      console.log('payload', payload)
      state.hasVirus = payload;
      const currentStorage = JSON.parse(LocalStorage.get('interpolStart'));
      LocalStorage.set('interpolStart', JSON.stringify({ ...currentStorage, illegalActivity: state }));
    }
  }
});

// Reducers
export default illegalActivitySlice.reducer;

// Selectors
export const illegalActivitySelector = (state) => state.illegalActivity.isIllegal;
export const virusSelector = (state) => state.illegalActivity.hasVirus;

// Actions
const { setIllegalActivity } = illegalActivitySlice.actions;
const { setVirus } = illegalActivitySlice.actions;

// Thunks
export const setIsIllegal = (illegal) => (dispatch) => {  
  dispatch(setIllegalActivity(illegal));
};

export const setHasVirus = (virus) => (dispatch) => {  
  dispatch(setVirus(virus));
};