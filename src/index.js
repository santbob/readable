import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import { ConnectedRouter, routerReducer, routerMiddleware} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

import * as reducers from './reducers'
import {Link} from 'react-router-dom'
import App from './components/App'
import AddPost from './components/AddPost'
import ViewPost from './components/ViewPost'
import ListPosts from './components/ListPosts'
import EditPost from './components/EditPost'

import registerServiceWorker from './registerServiceWorker';
import './assets/css/pure-min.css'
import './assets/css/grids-responsive-min.css'
import './assets/css/layout.css'
import './assets/css/index.css'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const routeHistoryMiddleware = routerMiddleware(history)


// Add the reducer to your store on the `routing` key
const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }), composeEnhancers(applyMiddleware(routeHistoryMiddleware,thunk))
)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div id="layout">
        <div className="header">
          <h1 className="brand-title"><Link to={"/"}>The Reader</Link></h1>
          <h2 className="brand-tagline">A React Nanodegree project</h2>
          <Link to="/addpost"><button className="header_right_center fab_btn">+</button></Link>
        </div>
        <div className="content">
          <Route exact path="/" component={App}/>
          <Route exact path="/addpost" component={AddPost}/>
          <Route exact path="/:category" component={ListPosts}/>
          <Route exact path="/:category/:postId" component={ViewPost}/>
          <Route exact path="/:category/:postId/edit" component={EditPost}/>
        </div>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
