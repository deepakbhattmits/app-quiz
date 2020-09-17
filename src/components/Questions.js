/** @format */

import React from 'react';
import { connect } from 'react-redux';
import { quizConstants } from '../constants/';
//import reducer from '../reducer';
//import * from '../../public/data/questions';

//import {Route, NavLink, BrowserRouter as Router, } from 'react-router-dom';
//import '../App.css';

const mapStateToProps = (state) => ({
	...state.quiz,
	...state.mode,
	...state.pager,
});

const mapDispatchToProps = (dispatch) => ({
	onAnswer: (payload) => dispatch({ type: quizConstants.QuizAnswer, payload }),
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
		q.options.find((x) => x.id === option.id).selected = true;
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
							{q.options.map((option) => (
								<div key={option.id} className='col-6'>
									<div className='option'>
										<label className='font-weight-normal' htmlFor={option.id}>
											<input
												id={option.id}
												checked={option.selected}
												type='checkbox'
												onChange={() => this.onAnswer(q, option)}
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
					{this.props.quiz.config.allowBack && (
						<button
							id='first'
							className='btn btn-default'
							onClick={this.props.move}>
							First
						</button>
					)}
					{this.props.quiz.config.allowBack && (
						<button
							id='prev'
							className='btn btn-default'
							onClick={this.props.move}>
							Prev
						</button>
					)}
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
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

// class Question extends React.Component {
//   render() {
//     return (
//       <React.Fragment>
//         <div className="container-fluid">
//           <h1 className="text-center">Javascript Quiz</h1>
//           <hr />

//           <span className="badge badge-info">
//             Question
//             <span> 1
//               {/* {
//                 this.props.questions[this.props.questionTypeId - 1]
//                   .questionTypeId
//               } */}
//             </span>
//             of 10
//           </span>
//           <h2> ??????
//             {/* {this.props.questions[this.props.questionTypeId - 1].questionTypeId}
//             . {this.props.name} */}
//           </h2>

//           <div className="answer-options d-inline-block col-6">
//             <input
//               className="checkbox-inline"
//               type="checkbox"
//               value=""
//               id="option1"
//             />
//             <label className="form-check-label" htmlFor="option1"> Hi
//               {/* {
//                 this.props.questions[this.props.questionTypeId - 1].options[0]
//                   .name
//               } */}
//             </label>
//           </div>

//           <div className="answer-options d-inline-block col-6">
//             <input
//               className="checkbox-inline"
//               type="checkbox"
//               value=""
//               id="option2"
//             />
//             <label className="form-check-label" htmlFor="option2"> Hi
//               {/* {
//                 this.props.questions[{this.props.questionTypeId} - 1].options[1]
//                   .name
//               } */}
//             </label>
//           </div>

//           <br />

//           <div className="answer-options d-inline-block col-6">
//             <input
//               className="checkbox-inline"
//               type="checkbox"
//               value=""
//               id="option3"
//             />
//             <label className="form-check-label" htmlFor="option3"> Hi
//               {/* {
//                 this.props.questions[{this.props.questionTypeId} - 1].options[2]
//                   .name
//               } */}
//             </label>
//           </div>

//           <div className="answer-options d-inline-block col-6">
//             <input
//               className="checkbox-inline"
//               type="checkbox"
//               value=""
//               id="option4"
//             />
//             <label className="form-check-label" htmlFor="option4"> Hi
//               {/* {
//                 this.props.questions[this.props.questionTypeId - 1].options[3]
//                   .name
//               } */}
//             </label>
//           </div>
//           <br />

//           <hr />

//         <ul>
//             <li>
//                 <input type="button" value="First" activeClassName="active" />
//             </li>
//             {/* <li>
//                 <NavLink activeClassName="active">Prev</NavLink>
//             </li>
//             <li>
//                 <NavLink activeClassName="active">Next</NavLink>
//             </li>
//             <li>
//                 <NavLink activeClassName="active">Last</NavLink>
//             </li> */}
//         </ul>

//         {/* <div>
//             <Route exact path ="/" component={Home} />
//             <Route path ="/aboutus" component={AboutUs} />
//             <Route path ="/contactus" component={ContactUs} />
//         </div> */}
//         </div>
//       </React.Fragment>
//     );
//   }
// }

//export default Question;
