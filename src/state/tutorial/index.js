import { createSlice } from '@reduxjs/toolkit';
import store from '../store';
import LocalStorage from '../../helpers/scripts/localStorage';

export const Tutorials = {
  ONE: 'tutorialOne',
  TWO: 'tutorialTwo',
  THREE: 'tutorialThree',
  FOUR: 'tutorialFour'
}

export const Steps = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5
}

let initialState = {};

// Check if we have data from localStorage
const data = JSON.parse(LocalStorage.get('interpolStart'));
if (data) {
  initialState = data.tutorial;
} else {
  // if we don't, start at tutorial one, step one
  initialState = {
    currentTutorial: Tutorials.ONE,
    currentStep: Steps.ONE
  };
}

// Slices
const tutorialSlice = createSlice({
  name: 'currentTutorial',
  initialState,
  reducers: {
    setCurrentTutorial: (state, action) => {
      const { payload } = action;
      state.currentTutorial = payload;
      const currentStorage = JSON.parse(LocalStorage.get('interpolStart'));
      LocalStorage.set('interpolStart', JSON.stringify({ ...currentStorage, tutorial: state }));
    },
    setCurrentStep: (state, action) => {
      const { payload } = action;
      state.currentStep = payload;
      const currentStorage = JSON.parse(LocalStorage.get('interpolStart'));
      LocalStorage.set('interpolStart', JSON.stringify({ ...currentStorage, tutorial: state }));
    }
  }
});

// Reducers
export default tutorialSlice.reducer;

// Selectors
export const tutorialSelector = (state) => state.tutorial.currentTutorial;
export const stepSelector = (state) => state.tutorial.currentStep;

// Actions
const { setCurrentTutorial } = tutorialSlice.actions;
const { setCurrentStep } = tutorialSlice.actions;

// Thunks
export const nextTutorial = () => (dispatch) => {
  const { currentTutorial } = store.getState().tutorial;
  let tutorial;
  switch(currentTutorial) {
    case Tutorials.ONE:
      tutorial = Tutorials.TWO;
      break;
    case Tutorials.TWO:
      tutorial = Tutorials.THREE;
      break;
    case Tutorials.THREE:
      tutorial = Tutorials.FOUR;
      break;
    default:
      tutorial = null;
  }
  dispatch(setCurrentTutorial(tutorial));
};

export const pushTutorial = (pushedTutorial) => (dispatch) => {
  dispatch(setCurrentTutorial(pushedTutorial));
};

export const nextStep = () => (dispatch) => {
  const { currentStep } = store.getState().tutorial;
  let step;
  switch(currentStep) {
    case Steps.ONE:
      step = Steps.TWO;
      break;
    case Steps.TWO:
      step = Steps.THREE;
      break;
    case Steps.THREE:
      step = Steps.FOUR;
      break;
    case Steps.FOUR:
      step = Steps.FIVE;
      break;
    default:
      step = null;
  }
  dispatch(setCurrentStep(step));
};

export const pushStep = (pushedStep) => (dispatch) => {
  dispatch(setCurrentStep(pushedStep));
};