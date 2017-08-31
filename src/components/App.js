import React, { Component } from 'react';

import {loadAllPosts, loadCategories, loadPostForCategory} from '../actions'
import {connect} from 'react-redux';



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
            <li key={category.path} onClick={() => this.props.loadPostForCategory(category.path)}><b>{category.name}</b></li>
          ))}
        </ul>
        <ul>
          {posts && posts.map((post) => (
            <li key={post.id}>
                <div><b>{post.title}</b></div>
                <div>{post.body}</div>
                <div><span>post by {post.author} on {post.timestamp}</span></div>
            </li>
          ))}
        </ul>
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
