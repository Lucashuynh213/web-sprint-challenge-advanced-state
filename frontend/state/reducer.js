// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux';
import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, INPUT_CHANGE } from './action-types';


const initialWheelState = 0;
function wheel(state = initialWheelState, action) {
  switch (action.type) {
    case MOVE_CLOCKWISE:
      return (state + 1) % 6;
    case MOVE_COUNTERCLOCKWISE:
      return (state - 1 + 6) % 6;
    default:
      return state;
  }
}

const initialQuizState = null;
function quiz(state = initialQuizState, action) {
  switch (action.type) {
    case 'SET_QUIZ':
      return action.payload;
    default:
      return state;
  }
}

const initialSelectedAnswerState = null;
function selectedAnswer(state = initialSelectedAnswerState, action) {
  // Handle actions related to the selected answer state here
  return state;
}

const initialMessageState = '';
function infoMessage(state = initialMessageState, action) {
  // Handle actions related to the info message state here
  return state;
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
};
function form(state = initialFormState, action) {
  // Handle actions related to the form state here
  switch(action.type){
    case INPUT_CHANGE: 
    return {
      ...state,
      [action.payload.id]: action.payload.value
    }
    default:
      return state;
  }
}
export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
