/** @format */

import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onQuizLoad, onPagerUpdate } from '../actions';
import Quiz from './Quiz';
import '../assets/styles/index.scss';
const App = () => {
	const dispatch = useDispatch();
	const quiz = useSelector((state) => state.quiz.quiz);
	const [state, setState] = useState({
		quizes: [{ id: '/data/javascript.json', name: 'Javascript' }],
		quizId: '/data/javascript.json',
	});

	const load = useCallback((quizId) => {
		const pager = {
			index: 0,
			size: 1,
			count: 1,
		};
		let url = quizId;
		fetch(`../${url}`)
			.then((res) => res.json())
			.then((res) => {
				let quiz = res;
				quiz.questions.forEach((q) => {
					q.options.forEach((o) => (o.selected = false));
				});
				quiz.config = Object.assign(quiz.config || {}, quiz.config);
				pager.count = quiz.questions.length / pager.size;
				dispatch(onQuizLoad(quiz));
				dispatch(onPagerUpdate(pager));
			});
	}, []);
	useEffect(() => {
		if (!!!quiz.questions?.length) {
			load(state.quizId);
		}
	}, [load, state, quiz]);

	return (
		<div className='container'>
			<header className='p-2'>
				<div className='row'>
					<div className='col-6'>
						<h3>Quiz Application</h3>
					</div>
				</div>
			</header>
			<Quiz />
		</div>
	);
};

export default App;
