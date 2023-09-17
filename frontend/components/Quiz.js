import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchQuiz, selectAnswer, postAnswer } from "../state/action-creators";

export default function Quiz() {
  const quiz = useSelector((state) => state.quiz);
  const selectedAnswer = useSelector((state) => state.selectedAnswer);
  const infoMessage = useSelector((state) => state.infoMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch the quiz when the component mounts
    dispatch(fetchQuiz());
  }, [dispatch]);

  const handleSelectAnswer = (answer) => {
    dispatch(selectAnswer(answer));
  };

  const handleSubmitAnswer = () => {
    // Submit the selected answer to the server
    dispatch(postAnswer());
  };

  return (
    <div id="wrapper">
      {quiz ? (
        <>
          <h2>{quiz.question}</h2>

          <div id="quizAnswers">
            {quiz.answers.map((answer) => (
              <div
                key={answer.answer_id}
                className={`answer ${
                  selectedAnswer?.answer_id === answer.answer_id ? "selected" : ""
                }`}
              >
                {answer.text}
                <button onClick={() => handleSelectAnswer(answer)}>
                  {selectedAnswer?.answer_id === answer.answer_id ? "SELECTED" : "Select"}
                </button>
              </div>
            ))}
          </div>
          {/* <pre>{JSON.stringify(quiz, null, 2)}</pre> */}

          <button
            disabled={!selectedAnswer}
            onClick={handleSubmitAnswer}
            id="submitAnswerBtn"
          >
            Submit answer
          </button>

          {infoMessage && <div>{infoMessage}</div>}
        </>
      ) : (
        "Loading next quiz..."
      )}
    </div>
  );
}
