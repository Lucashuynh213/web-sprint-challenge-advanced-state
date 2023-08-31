import React from 'react'
import { connect } from 'react-redux'
// import * as actionCreators from '../state/action-creators'
import {inputChange,postQuiz,resetForm} from '../state/action-creators'
 
export function Form(props) {

  const onChange = evt => {
    evt.preventDefault()
    // props.inputChange(evt.target)
    console.log("onChange", evt.target)
  }

  const onSubmit = evt => {
    evt.preventDefault()
    const newQuestion = props.form.newQuestion;
    const newTrueAnswer = props.form.newTrueAnswer;
    const newFalseAnswer = props.form.newFalseAnswer;
    props.postQuiz(newQuestion,newTrueAnswer,newFalseAnswer);
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" value={props.form.newQuestion}/>
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" value={props.form.newTrueAnswer}/>
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" value={props.form.newFalseAnswer}/>
      <button id="submitNewQuizBtn">Submit new quiz</button>
    </form>
  )
}

// export default connect(st => st, actionCreators)(Form)
const mapStateToProps = state => {
  return {
    form: state.form
  }
}
export default connect(mapStateToProps,{inputChange,postQuiz,resetForm})(Form)