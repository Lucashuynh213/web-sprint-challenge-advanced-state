// ❗ You don't need to add extra action creators to achieve MVP
import axios from 'axios';
// import quiz from './reducer'
import { createStore } from 'redux';
// import rootReducer from './reducer';
import { store } from './store'
import { useSelector, useDispatch } from 'react-redux';
import {INPUT_CHANGE,RESET_FORM,SET_SELECTED_ANSWER,SET_QUIZ_INTO_STATE} from "./action-types"

export function moveClockwise() { }

export function moveCounterClockwise() { }

export function selectAnswer() { }

export function setMessage() { }

export function setQuiz() { }

export function inputChange(input) {
  return {
    type: INPUT_CHANGE, payload: input
  }
 }

export function resetForm() { }

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    axios.get(`http://localhost:9000/api/quiz/next`)
      .then(res => {
        store.dispatch({
          type: SET_QUIZ_INTO_STATE, payload: res.data
        })
        console.log(res.data)
      })

  }
}

export function postAnswer(payload) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
    // `[POST] http://localhost:9000/api/quiz/answer`
    // - Expects a payload with the following properties: `quiz_id`, `answer_id`
    // - Example of payload: `{ "quiz_id": "LVqUh", "answer_id": "0VEv0" }`
    // - A response to a proper request includes `200 OK` and feedback on the answer
    console.log('post',payload);
  axios.post(`http://localhost:9000/api/quiz/answer`,payload)
    .then((res) => {
      store.dispatch({
        type: SET_SELECTED_ANSWER
      })
      console.log(res);
    })
  }
} 
export function postQuiz() {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
