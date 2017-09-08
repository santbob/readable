import React, {Component} from 'react';

import {loadCommentsForPost} from '../actions'
import {connect} from 'react-redux';

import Post from './Post'
import Comment from './Comment'

class ViewPost extends Component {

  componentDidMount() {
    const {match, loadCommentsForPost} = this.props
    const postId = (match && match.params && match.params.postId)
      ? match.params.postId
      : null

    loadCommentsForPost(postId)
  }
  render() {
    const {posts, match, comments} = this.props

    const postId = (match && match.params && match.params.postId)
      ? match.params.postId
      : null

    const post = posts[postId]

    const commentsForPost = Object.values(comments).filter(comment => comment.parentId === postId && !comment.deleted)

    return (
      <div>
        <Post post={post}/>
        <div>
          <div>Responses</div>
          {commentsForPost && commentsForPost.map((comment) => (
            <Comment comment={comment} key={comment.id}/>
          ))}
        </div>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    loadCommentsForPost: (postId) => dispatch(loadCommentsForPost(postId))
  }
}

function mapStateToProps({posts, loadingData, comments}) {
  return {posts, loadingData, comments}
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewPost)
