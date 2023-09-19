import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { inputChange, postQuiz, resetForm } from "../state/action-creators";

export function Form(props) {
  const [isFormValid, setIsFormValid] = useState(false);
  const infoMessage = useSelector((state) => state.infoMessage);

  // Function to check the validity of form fields
  const isInputValid = (value) => {
    return value.trim().length > 0;
  };

  useEffect(() => {
    // Check the validity of all input fields and update isFormValid state
    const { newQuestion, newTrueAnswer, newFalseAnswer } = props.form;
    const isValid =
      isInputValid(newQuestion) &&
      isInputValid(newTrueAnswer) &&
      isInputValid(newFalseAnswer);
    setIsFormValid(isValid);
  }, [props.form]);

  const onChange = (evt) => {
    evt.preventDefault();
    props.inputChange(evt.target);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    const newQuiz = {
      newQuestion: props.form.newQuestion,
      newTrueAnswer: props.form.newTrueAnswer,
      newFalseAnswer: props.form.newFalseAnswer,
    };
    props.postQuiz(newQuiz);

    // Clear the form fields or reset the form if needed
    // props.resetForm();
  };

  return (
    <form id="form" onSubmit={onSubmit}>
      {infoMessage && <div>{infoMessage}</div>}
      <h2>Create New Quiz</h2>
      <input
        maxLength={50}
        onChange={onChange}
        id="newQuestion"
        placeholder="Enter question"
        value={props.form.newQuestion}
      />
      <input
        maxLength={50}
        onChange={onChange}
        id="newTrueAnswer"
        placeholder="Enter true answer"
        value={props.form.newTrueAnswer}
      />
      <input
        maxLength={50}
        onChange={onChange}
        id="newFalseAnswer"
        placeholder="Enter false answer"
        value={props.form.newFalseAnswer}
      />
      <button
        id="submitNewQuizBtn"
        disabled={!isFormValid}
      >
        Submit new quiz
      </button>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    form: state.form,
  };
};

export default connect(mapStateToProps, { inputChange, postQuiz, resetForm })(
  Form
);