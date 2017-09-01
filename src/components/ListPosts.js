import React, {Component} from 'react';

import {loadAllPosts, loadCategories, loadPostForCategory, sortBy} from '../actions'
import {connect} from 'react-redux';

class ListPosts extends Component {

  componentDidMount() {
    const {loadAllPosts, loadCategories, categories, posts} = this.props
    if (!categories || categories.length) {
      loadCategories()
    }

    if (!posts || !posts.length) {
      loadAllPosts()
    }
  }
  render() {
    const {posts, match, sortPostsBy} = this.props

    const sortOptions = ["Default", "Date", "Votes"]

    const sortBy = sortPostsBy || sortOptions[0]

    const category = (match && match.params && match.params.category)
      ? match.params.category
      : null

    const filteredPosts = posts.filter(post => !category || (category && post.category === category));

    if (sortBy !== sortOptions[0]) {
      filteredPosts.sort(function(a, b) {
        if (sortBy === 'Date') {
          return (a.timestamp < b.timestamp)? -1 : 1
        } else {
          return (a.voteScore < b.voteScore)? -1 : 1
        }
      })
    }

    return (
      <div>
        <select value={sortBy} onChange={(event) => this.props.sortPost(event.target.value)}>
          {sortOptions.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
        <ul>
          {filteredPosts && filteredPosts.map((post) => (
            <li key={post.id}>
              <div>
                <b>{post.title}</b>
              </div>
              <div>{post.body}</div>
              <div>
                <span>post by {post.author}
                  on {post.timestamp}</span>
              </div>
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
    loadPostForCategory: (category) => dispatch(loadPostForCategory(category)),
    sortPost: (by) => dispatch(sortBy(by))
  }
}

function mapStateToProps({posts, categories, filterByCategory, loadingData, sortPostsBy}) {
  return {posts, categories, filterByCategory, loadingData, sortPostsBy}
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPosts)
