/** @format */

import React from 'react';

const Review = ({ quiz, move }) => {
	const isAnswered = (q) => {
		let isAnswered = q.options.some((x) => x.selected);

		return isAnswered ? 'Answered' : 'Not Answered';
	};
	return (
		<div>
			<h2 className='text-center font-weight-normal'>
				Review Quiz: {quiz.name}
			</h2>
			<hr />
			<div className='row text-center'>
				{quiz.questions.map((q, index) => (
					<div key={q.id} className='col-4 cursor-pointer'>
						<div
							id={index}
							onClick={move}
							className={`p-3 mb-2 ${
								isAnswered(q) === 'Answered' ? 'bg-info' : 'bg-warning'
							}`}>
							{index + 1}. {isAnswered(q)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Review;
