/** @format */
import React, { useState, useCallback, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { onSubmit, onPagerUpdate } from '../actions';
import Review from './Review';
import Questions from './Questions';
import Result from './Result';
// Quiz
const Quiz = () => {
	const dispatch = useDispatch();
	// const history = useHistory();
	const quiz = useSelector((state) => state.quiz.quiz);
	const mode = useSelector((state) => state.quiz.mode);
	const pager = useSelector((state) => state.quiz.pager);
	let selected = [];
	selected = [
		...selected,
		quiz.questions.filter((el) => el.options.find((el) => el.selected)),
	][0]?.length;

	const move = useCallback(
		(e) => {
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
		},
		[pager, dispatch]
	);
	const setMode = useCallback(
		(e) => {
			try {
				dispatch(onSubmit(e.target.id));
			} catch (err) {
				console.log(err);
			}
		},
		[dispatch]
	);

	const renderMode = useCallback(() => {
		if (mode === 'quiz') {
			return <Questions move={move} />;
		} else if (mode === 'review') {
			return <Review quiz={quiz} move={move} />;
		} else if (mode === 'submit') {
			let confirmation = window.confirm('Are you sure for submission ?');
			if (confirmation) {
				return (
					<Result
						questions={quiz.questions || []}
						move={move}
						setMode={setMode}
					/>
				);
			} else {
				// const e = { target: { id: 'quiz' } };
				// setMode(e);
				return true;
			}
		}
	}, [mode, move, quiz, setMode]);
	return (
		<div>
			{renderMode()}
			{mode !== 'submit' && (
				<div>
					<hr />
					{/* <button
    					id='quiz'
    					className='btn btn-info'
    					onClick={(e) => {
    						setMode(e);
    					}}>
    					Quiz
    				</button> */}
					{mode === 'review' && (
						<button
							id='quiz'
							className='btn btn-info'
							onClick={(e) => {
								setMode(e);
							}}>
							Back to Quiz
						</button>
					)}
					{mode !== 'review' && (
						<>
							<button
								to='/quiz/review'
								id='review'
								className='btn btn-info'
								onClick={(e) => {
									setMode(e);
								}}>
								Review
							</button>
							{selected === pager.count ? (
								<button
									id='submit'
									className='btn btn-primary'
									onClick={(e) => {
										setMode(e);
									}}>
									Submit Quiz
								</button>
							) : (
								''
							)}
						</>
					)}
				</div>
			)}
		</div>
	);
};
export default Quiz;
