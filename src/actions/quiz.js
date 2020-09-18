/** @format */

import { quizConstants } from '../constants';
export const onSubmit = (payload) => async (dispatch) => {
	dispatch({ type: quizConstants.QuizSubmit, payload });
};
export const onPagerUpdate = (payload) => async (dispatch) => {
	dispatch({ type: quizConstants.PagerUpdate, payload });
};

export const onQuizLoad = (payload) => async (dispatch) => {
	dispatch({ type: quizConstants.QuizLoad, payload });
};

export const onAnswer = (payload) => async (dispatch) => {
	dispatch({ type: quizConstants.QuizAnswer, payload });
};
