import React, { Component } from 'react';

import {loadAllPosts, loadCategories, loadPostForCategory} from '../actions'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import ListPosts from './ListPosts'

class App extends Component {
  componentDidMount() {
    const {loadAllPosts, loadCategories} = this.props
    loadCategories()
    loadAllPosts()
  }
  render() {
    const {categories, posts} = this.props
    return (
      <div id="layout">
        <div className="header">
          <h1 className="brand-title">The Reader</h1>
          <h2 className="brand-tagline">A React Nanodegree project</h2>
          <Link to="/create"><button className="top_right fab_btn">+</button></Link>
          <nav className="nav">
              <ul className="nav-list">
                {categories && categories.map((category) => (
                  <li className="nav-item" key={category.path}><Link to={`${category.path}`} className="pure-button"><b>{category.name}</b></Link></li>
                ))}
              </ul>
          </nav>
        </div>
        <div className="content">
          <ListPosts />
        </div>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    loadAllPosts: () => dispatch(loadAllPosts()),
    loadCategories: () => dispatch(loadCategories()),
    loadPostForCategory: (category) => dispatch(loadPostForCategory(category))
  }
}

function mapStateToProps({posts, categories, filterByCategory, loadingData}) {
  return {posts, categories, filterByCategory, loadingData}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
