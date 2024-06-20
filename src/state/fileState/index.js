import { createSlice } from '@reduxjs/toolkit';
import LocalStorage from '../../helpers/scripts/localStorage';

let initialState = {
  fileVisible: false,
  fileContent: 'virus'
};

// Check if we have data from localStorage
const data = JSON.parse(LocalStorage.get('interpolStart'));
if (data) {
  initialState = data.fileState;
} else {
  // if we don't, start at tutorial one, step one
  initialState = {
    fileVisible: false,
    fileContent: 'virus'
  };
}

// Slices
const fileStateSlice = createSlice({
    name: 'fileState',
    initialState,
    reducers: {
        setFileContent: (state, action) => {
            const { payload } = action;
            state.fileContent = payload;
            const currentStorage = JSON.parse(LocalStorage.get('interpolStart'));
            LocalStorage.set('interpolStart', JSON.stringify({ ...currentStorage, fileState: state }));
        },
        setFileVisible: (state, action) => {
            const { payload } = action;
            state.fileVisible = payload;
            const currentStorage = JSON.parse(LocalStorage.get('interpolStart'));
            LocalStorage.set('interpolStart', JSON.stringify({ ...currentStorage, fileState: state }));
        }
    }
});

// Reducers
export default fileStateSlice.reducer;

// Selectors
export const fileVisibleSelector = (state) => state.fileState.fileVisible;
export const fileVisibleContent = (state) => state.fileState.fileContent;

// Actions
const { setFileContent } = fileStateSlice.actions;
const { setFileVisible } = fileStateSlice.actions;

// Thunks
export const setFileStateContent = (data) => (dispatch) => {  
    dispatch(setFileContent(data));
};
export const setFileVisibleContent = (data) => (dispatch) => {  
    dispatch(setFileVisible(data));
};