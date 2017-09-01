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
    console.log("categories" + categories)
    console.log("posts" + posts)
    return (
      <div>
        <ul>
          {categories && categories.map((category) => (
            <li key={category.path}><Link to={`${category.path}`}><b>{category.name}</b></Link></li>
          ))}
        </ul>
        <ListPosts />
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
