/** @format */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import reducer from './reducer';
import App from './components/App';
import Result from './components/Result';
import Review from './components/Review';
import Home from './components/Home';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	reducer,
	composeEnhancers(applyMiddleware(reduxThunk))
);

function RoutingComponent() {
	return (
		<div>
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/quiz' component={App} />
				<Route exact path='/quiz/review' component={Review} />
				<Route exact path='/quiz/result' component={Result} />
			</Switch>
		</div>
	);
}
const rootElement = document.querySelector('#root');
ReactDOM.render(
	<Provider store={store}>
		<Router>
			<RoutingComponent />
		</Router>
	</Provider>,
	rootElement
);
