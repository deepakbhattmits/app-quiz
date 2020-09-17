/** @format */

import React, { useCallback } from 'react';
import { onSubmit, onPagerUpdate } from '../actions';
import Review from './Review';
import Questions from './Questions';
import Result from './Result';
import { useSelector, useDispatch } from 'react-redux';
//import { useHistory } from "react-router-dom";
//import {Link} from 'react-router-dom';

// const mapStateToProps = (state) => {
// 	return { ...state.quiz, ...state.mode, ...state.pager };
// };

// const mapDispatchToProps = (dispatch) => ({
// 	onSubmit: (payload) => dispatch({ type: ActionTypes.QuizSubmit, payload }),
// 	onPagerUpdate: (payload) =>
// 		dispatch({ type: ActionTypes.PagerUpdate, payload }),
// });

const Quiz = () => {
	const dispatch = useDispatch();
	const quiz = useSelector((state) => state.quiz.quiz);
	const mode = useSelector((state) => state.quiz.mode);
	const pager = useSelector((state) => state.quiz.pager);
	const move = (e) => {
		let id = e.target.id;
		let index = 0;
		if (id === 'first') index = 0;
		else if (id === 'prev') index = pager.index - 1;
		else if (id === 'next') index = pager.index + 1;
		else if (id === 'last') index = pager.count - 1;
		else index = parseInt(e.target.id, 10);

		if (index >= 0 && index < pager.count) {
			const pagerCount = {
				index: index,
				size: 1,
				count: pager.count,
			};
			try {
				dispatch(onPagerUpdate(pagerCount));
			} catch (err) {
				console.log(err);
			}
		}
	};

	// redirect = (e) => {
	//     //let history = useHistory();
	//     this.props.history.push("/quiz/review");
	// }

	const setMode = useCallback((e) => {
		// let history = useHistory();
		// console.log(e.target.id);
		// if(e.target.id === 'review') history.push("/quiz/review");
		// if(e.target.id === 'submit') history.push("/quiz/result");
		try {
			dispatch(onSubmit(e.target.id));
		} catch (err) {
			console.log(err);
		}
	}, []);

	const renderMode = () => {
		if (mode === 'quiz') {
			return <Questions move={move} />;
		} else if (mode === 'review') {
			return <Review quiz={quiz} move={move} />;
		} else {
			return <Result questions={quiz.questions || []} />;
		}
	};
	return (
		<div>
			{renderMode()}
			{mode !== 'submit' && (
				<div>
					<hr />
					<button
						id='quiz'
						className='btn btn-info'
						onClick={(e) => {
							setMode(e);
						}}>
						Quiz
					</button>
					<button
						to='/quiz/review'
						id='review'
						className='btn btn-info'
						onClick={(e) => {
							setMode(e);
						}}>
						Review
					</button>
					<button
						id='submit'
						className='btn btn-primary'
						onClick={(e) => {
							setMode(e);
						}}>
						Submit Quiz
					</button>
				</div>
			)}
		</div>
	);
};
export default Quiz;

// export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
