// ❗ You don't need to add extra action creators to achieve MVP
import axios from "axios";
// import quiz from './reducer'
import { createStore } from "redux";
// import rootReducer from './reducer';
import { store } from "./store";
import { useSelector, useDispatch } from "react-redux";
import {
  INPUT_CHANGE,
  RESET_FORM,
  SET_SELECTED_ANSWER,
  SET_QUIZ_INTO_STATE,
  SET_INFO_MESSAGE,
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
} from "./action-types";

export function moveClockwise(initialWheelState) {
  return store.dispatch({
    type: MOVE_CLOCKWISE,
    initialWheelState
  });
}
export function moveCounterClockwise(initialWheelState) {
  return store.dispatch({
    type: MOVE_COUNTERCLOCKWISE,
    initialWheelState
  });
}
export function selectAnswer(payload) {
  return store.dispatch({
    type: SET_SELECTED_ANSWER,
    payload,
  });
}

export function setMessage(payload) {
  return store.dispatch({
    type: SET_INFO_MESSAGE,
    payload,
  });
}

export function setQuiz(submit) {
  return {
    type: SET_QUIZ_INTO_STATE,
    payload: submit,
  };
}

export function inputChange(newQuiz) {
  return {
    type: INPUT_CHANGE,
    payload: newQuiz,
  };
}

export function resetForm(value) {
  return store.dispatch({
    type: RESET_FORM,
    payload: value,
  });
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    axios.get(`http://localhost:9000/api/quiz/next`).then((res) => {
      store.dispatch({
        type: SET_QUIZ_INTO_STATE,
        payload: res.data,
      });
      console.log(res.data);
    });
  };
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
    console.log(store.getState());
    const payload = {
      quiz_id: store.getState().quiz.quiz_id,
      answer_id: store.getState().selectedAnswer.answer_id,
    };
    axios.post(`http://localhost:9000/api/quiz/answer`, payload).then((res) => {
      dispatch(fetchQuiz()), dispatch(setMessage(res.data.message));
      console.log(res);
    });
  };
}
export function postQuiz(newQuiz) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form

    const newQuiz = {
      question_text: store.getState().form.newQuestion,
      true_answer_text: store.getState().form.newTrueAnswer,
      false_answer_text: store.getState().form.newFalseAnswer,
    };

    axios
      .post("http://localhost:9000/api/quiz/new", newQuiz)
      .then((res) => {
        dispatch(setMessage('Congrats: "foobarbaz?" is a great question!'));
        dispatch(resetForm);
        console.log(res);
      })
      .catch((error) => {
        // Handle errors if the POST request fails
        console.error("Error posting quiz:", error);
      });
  };
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
