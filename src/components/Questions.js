/** @format */

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Questions = ({ move }) => {
	const dispatch = useDispatch();
	const quiz = useSelector((state) => state.quiz.quiz);
	const pager = useSelector((state) => state.quiz.pager);
	const questions = quiz.questions
		? quiz.questions.slice(pager.index, pager.index + pager.size)
		: [];
	const onAnswer = (question, option) => {
		const quiz = JSON.parse(JSON.stringify(quiz));
		const q = quiz.questions.find((x) => x.id === question.id);
		if (q.questionTypeId === 1) {
			q.options.forEach((x) => {
				x.selected = false;
			});
		}
		q.options.find((x) => x.id === option.id).selected = true;
		dispatch(onAnswer(quiz));
	};
	return (
		<div id='quiz'>
			<h2 className='text-center font-weight-normal'>{quiz.name}</h2>
			<hr />
			{questions.map((q) => (
				<div key={q.id}>
					<div className='badge badge-info'>
						Question {pager.index + 1} of {pager.count}.
					</div>
					<h3 className='font-weight-normal'>
						{pager.index + 1}. <span>{q.name}</span>
					</h3>
					<div className='row text-left options'>
						{q.options.map((option) => (
							<div key={option.id} className='col-6'>
								<div className='option'>
									<label className='font-weight-normal' htmlFor={option.id}>
										<input
											id={option.id}
											checked={option.selected}
											type='checkbox'
											onChange={() => onAnswer(q, option)}
										/>
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
				{pager.index > 0 && (
					<>
						<button id='first' className='btn btn-default' onClick={move}>
							First
						</button>

						<button id='prev' className='btn btn-default' onClick={move}>
							Prev
						</button>
					</>
				)}
				{pager.index < pager.count - 1 && (
					<button id='next' className='btn btn-primary' onClick={move}>
						Next
					</button>
				)}
				<button id='last' className='btn btn-default' onClick={move}>
					Last
				</button>
			</div>
		</div>
	);
};

export default Questions;
