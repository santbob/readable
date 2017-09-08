import React, {Component} from 'react';

import {loadAllPosts, loadCategories, sortBy, voteOnPost} from '../actions'
import {connect} from 'react-redux';

import Post from './Post'

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

    const sortOptions = ["Date", "Votes"]

    const sortBy = sortPostsBy || sortOptions[0]

    const category = (match && match.params && match.params.category)
      ? match.params.category
      : null

    const filteredPosts = Object.values(posts).filter(post => !post.deleted && (!category || (category && post.category === category)));

    filteredPosts.sort(function(a, b) {
      if (sortBy === 'Date') {
        return (a.timestamp > b.timestamp)
          ? -1
          : 1
      } else {
        return (a.voteScore > b.voteScore)
          ? -1
          : 1
      }
    })

    return (
        <div className="posts">
          <select className="sort-option" value={sortBy} onChange={(event) => this.props.sortPost(event.target.value)}>
            {sortOptions.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
          {filteredPosts && filteredPosts.map((post) => (
            <Post post={post} key={post.id} showReadMore={true}/>
          ))}
        </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    loadAllPosts: () => dispatch(loadAllPosts()),
    loadCategories: () => dispatch(loadCategories()),
    sortPost: (by) => dispatch(sortBy(by)),
    voteOnPost: (postId, isUpVote) => dispatch(voteOnPost(postId, isUpVote))
  }
}

function mapStateToProps({posts, categories, filterByCategory, loadingData, sortPostsBy}) {
  return {posts, categories, filterByCategory, loadingData, sortPostsBy}
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPosts)
