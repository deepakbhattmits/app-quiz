/** @format */

import { quizConstants } from '../constants';

let initialQuiz = {
	quiz: {
		config: {
			allowBack: true,
			allowReview: true,
			autoMove: false, // if true, it will move to next question automatically when answered.
			duration: 0, // indicates the time in which quiz needs to be completed. 0 means unlimited.
			pageSize: 1,
			requiredAll: false, // indicates if you must answer all the questions before submitting.
			richText: false,
			shuffleQuestions: false,
			shuffleOptions: false,
			showClock: false,
			showPager: true,
			theme: 'none',
		},
		questions: [],
	},
	mode: 'quiz',
	pager: {
		index: 0,
		size: 1,
		count: 1,
	},
};
// reducer for quiz
export default (state = { ...initialQuiz }, action) => {
	switch (action.type) {
		case quizConstants.PagerUpdate:
			return {
				...state,
				pager: action.payload,
				mode: 'quiz',
			};
		case quizConstants.QuizLoad:
			return {
				...state,
				quiz: action.payload,
			};
		case quizConstants.QuizSubmit:
			console.log('quiz.js Submitted.');
			return {
				...state,
				mode: action.payload,
			};
		case quizConstants.QuizAnswer:
			console.log('quiz.js reducer Quiz Answer called.');
			return {
				...state,
				quiz: action.payload,
			};
		default:
			return state;
	}
};
