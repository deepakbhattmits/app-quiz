/** @format */

// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { onAnswer } from '../actions';

// const Questions = ({ move }) => {
// const dispatch = useDispatch();
// const quiz = useSelector((state) => state.quiz.quiz);
// const pager = useSelector((state) => state.quiz.pager);
// const questions = quiz.questions
// ? quiz.questions.slice(pager.index, pager.index + pager.size)
// : [];
// const onChange = (question, option) => {
// // console.log('QUESTION : ', question, 'OPTION ', option);
// const q = quiz.questions.find((x) => x.id === question.id);
// if (q?.questionTypeId === 1) {
// q.options.forEach((x) => {
// x.selected = false;
// });
// }
// if (q?.options) {
// q.options.find((x) => x.id === option.id).selected = true;
// }
// dispatch(onAnswer(quiz));
// };
// return (
// <div id='quiz'>
// <h2 className='text-center font-weight-normal'>{quiz.name}</h2>
// <hr />
// {questions.map((q) => (
// <div key={q.id}>
// <div className='badge badge-info'>
// Question {pager.index + 1} of {pager.count}.
// </div>
// <h3 className='font-weight-normal'>
// {pager.index + 1}. <span>{q.name}</span>
// </h3>
// <div className='row text-left options'>
// {q.options.map((option) => (
// <div key={option.id} className='col-6'>
// <div className='option'>
// <label className='font-weight-normal' htmlFor={option.id}>
// <input
// id={option.id}
// checked={option.selected}
// type='checkbox'
// onChange={() => onChange(q, option)}
// />
// {option.name}
// </label>
// </div>
// </div>
// ))}
// </div>
// </div>
// ))}
// <hr />
// <div className='text-center'>
// {pager.index > 0 && (
// <>
// <button id='first' className='btn btn-default' onClick={move}>
// First
// </button>

// <button id='prev' className='btn btn-default' onClick={move}>
// Prev
// </button>
// </>
// )}
// {pager.index < pager.count - 1 && (
// <>
// <button id='next' className='btn btn-primary' onClick={move}>
// Next
// </button>

// <button id='last' className='btn btn-default' onClick={move}>
// Last
// </button>
// </>
// )}
// </div>
// </div>
// );
// };

// export default Questions;

import React from 'react';
import { connect } from 'react-redux';
import { onAnswer } from '../actions';
//import reducer from '../reducer';
//import \* from '../../public/data/questions';

//import {Route, NavLink, BrowserRouter as Router, } from 'react-router-dom';
//import '../App.css';

const mapStateToProps = (state) => ({
	...state.quiz,
	...state.mode,
	...state.pager,
});

const mapDispatchToProps = (dispatch) => ({
	onAnswer: (payload) => dispatch(onAnswer(payload)),
});

class Questions extends React.Component {
	onAnswer(question, option) {
		let quiz = JSON.parse(JSON.stringify(this.props.quiz));
		let q = quiz.questions.find((x) => x.id === question.id);
		if (q.questionTypeId === 1) {
			q.options.forEach((x) => {
				x.selected = false;
			});
		}
		const corectAns = q.options.find((x) => x.id === option.id);
		corectAns.selected = true;
		this.props.onAnswer(quiz);
	}

	render() {
		let questions = this.props.quiz.questions
			? this.props.quiz.questions.slice(
					this.props.pager.index,
					this.props.pager.index + this.props.pager.size
			  )
			: [];
		return (
			<div id='quiz'>
				<h2 className='text-center font-weight-normal'>
					{this.props.quiz.name}
				</h2>
				<hr />
				{questions.map((q) => (
					<div key={q.id}>
						<div className='badge badge-info'>
							Question {this.props.pager.index + 1} of {this.props.pager.count}.
						</div>
						<h3 className='font-weight-normal'>
							{this.props.pager.index + 1}. <span>{q.name}</span>
						</h3>
						<div className='row text-left options'>
							{q.options.map((option, index) => (
								<div
									key={option.id}
									className={`col-6 ${index % 2 === 0 ? `pr-0` : `pl-0`}`}>
									<div className='option'>
										<input
											id={option.id}
											className='cursor-pointer'
											checked={option.selected}
											type='checkbox'
											onChange={() => this.onAnswer(q, option)}
										/>
										<label className='font-weight-normal' htmlFor={option.id}>
											{option.name}
										</label>
									</div>
								</div>
							))}
						</div>
					</div>
				))}
				<hr />
				<div className='text-center'>
					{this.props.pager.index > 0 && (
						<>
							<button
								id='first'
								className='btn btn-default'
								onClick={this.props.move}>
								First
							</button>

							<button
								id='prev'
								className='btn btn-default'
								onClick={this.props.move}>
								Prev
							</button>
						</>
					)}
					{this.props.pager.index < this.props.pager.count - 1 && (
						<>
							<button
								id='next'
								className='btn btn-primary'
								onClick={this.props.move}>
								Next
							</button>

							<button
								id='last'
								className='btn btn-default'
								onClick={this.props.move}>
								Last
							</button>
						</>
					)}
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
