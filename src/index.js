import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import reducers from './reducers'
import App from './components/App'
import CreatePost from './components/CreatePost'
import ViewPost from './components/ViewPost'
import registerServiceWorker from './registerServiceWorker';

// Add the reducer to your store on the `routing` key
const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  })
)

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
  <Router history={history}>
    <div>
      <Route exact path="/" component={App}/>
      <Route exact path="/post/:postId" component={ViewPost}/>
      <Route exact path="/create" component={CreatePost}/>
    </div>
  </Router>
</Provider>, document.getElementById('root'));
registerServiceWorker();
