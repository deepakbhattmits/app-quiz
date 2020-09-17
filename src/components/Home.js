/** @format */

import React from 'react';
import { NavLink } from 'react-router-dom';
//import "./Home.css";

const Home = () => {
	return (
		<div className='container-fluid text-center'>
			<div className='home'>
				<h1 className='text-center mt-3 mb-3'>Javascript Quiz</h1>
			</div>
			<NavLink className='text-center startQuiz' exact to='/quiz'>
				<button>Start Quiz</button>
			</NavLink>
		</div>
	);
};

export default Home;
