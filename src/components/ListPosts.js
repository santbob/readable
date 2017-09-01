import React, { Component } from 'react';

import { loadAllPosts, loadCategories, loadPostForCategory } from '../actions'
import { connect } from 'react-redux';

class ListPosts extends Component {
  componentDidMount() {
    const {loadAllPosts, loadCategories, categories, posts} = this.props
    if(!categories || categories.length) {
      loadCategories()
    }

    if(!posts || !posts.length) {
      loadAllPosts()
    }
  }
  render() {
    const {posts, match} = this.props

    const category = (match && match.params && match.params.category)?  match.params.category : null

    const filteredPosts = posts.filter(
      post => !category || (category && post.category === category)
    );
    return (
      <div>
        <ul>
          {filteredPosts && filteredPosts.map((post) => (
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

export default connect(mapStateToProps, mapDispatchToProps)(ListPosts)
