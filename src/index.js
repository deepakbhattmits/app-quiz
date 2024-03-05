/** @format */

import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { thunk } from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import reducer from './reducer'
import App from './components/App'
import Result from './components/Result'
import Review from './components/Review'
import Home from './components/Home'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

function RoutingComponent() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/quiz" element={<App />}></Route>
        <Route path="/quiz/review" element={<Review />}></Route>
        <Route path="/quiz/result" element={<Result />}></Route>
      </Routes>
    </div>
  )
}
const rootElement = document.querySelector('#root')
const root = createRoot(rootElement)
root.render(
  <Provider store={store}>
    <Router>
      <RoutingComponent />
    </Router>
  </Provider>,
)
