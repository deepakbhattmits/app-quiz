/** @format */

import React from 'react'
import { useNavigate } from 'react-router-dom'
// import Quiz from './Quiz'
// Result
const Result = ({ questions, setMode }) => {
  const navigate = useNavigate()
  // let confirmation = window.confirm('Are you sure for submission ?');
  // if (!confirmation) {
  // 	const e = { target: { id: 'quiz' } };
  // 	setMode(e);
  // 	return <Quiz />;
  // }
  // if (confirmation) {
  const redirect = () => {
    const e = { target: { id: 'quiz' } }
    setMode(e)
    navigate('/')
  }
  questions.forEach((q) => {
    q.isCorrect = q.options.every((x) => x.selected === x.isAnswer)
  })

  return (
    <div className="result">
      <h2 className="text-center font-weight-normal">Quiz Result</h2>
      {questions.map((q, index) => (
        <div
          key={q.id}
          className={`mb-2 ${q.isCorrect ? 'bg-success' : 'bg-danger'}`}
        >
          <div className="result-question">
            <h5>
              {index + 1}. {q.name}
            </h5>
            <div className="row">
              {q.options.map((option) => (
                <div key={option.id} className="col-6">
                  <input
                    id={option.id}
                    type="checkbox"
                    disabled="disabled"
                    checked={option.selected}
                  />{' '}
                  {option.name}
                </div>
              ))}
            </div>
            <div
              className={`m-1 p-1 text-bold ${
                q.isCorrect ? 'text-success' : 'text-danger'
              }`}
            >
              Your answer is {q.isCorrect ? 'Correct' : 'Wrong'}.
            </div>
          </div>
        </div>
      ))}
      <button name="/" className="btn btn-primary" onClick={redirect}>
        Redirect to Home
      </button>
      <h4 className="alert alert-info text-center">
        You may close this window now.
      </h4>
    </div>
  )
}
// };

export default Result
