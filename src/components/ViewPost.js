import React, {Component} from 'react';

import {loadAllPosts, loadCategories, sortBy, voteOnPost} from '../actions'
import {connect} from 'react-redux';

import Post from './Post'

class ViewPost extends Component {

  componentDidMount() {

  }
  render() {
    const {posts, match, comments} = this.props

    const category = (match && match.params && match.params.category)
      ? match.params.category
      : null

    const postId = (match && match.params && match.params.postId)
      ? match.params.postId
      : null

    const post = posts.filter(p => p.id === postId)[0];

    return (
        <div>
          <Post post={post} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewPost)
