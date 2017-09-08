import React, { Component } from 'react';
import * as utils from '../utils'
import {voteOnComment, deleteComment} from '../actions'
import {connect} from 'react-redux';


class Comment extends Component {
  render() {
    const {comment} = this.props
    return (
      <section className="post" key={comment.id}>
        <header className="post-header">
            <p className="post-meta"><span className="post-author">{comment.author}</span> on {utils.printDate(comment.timestamp)}</p>
        </header>
        <div className="post-description">
            <p>{comment.body}</p>
        </div>
        <div>
          <div className="icon-container"><span className="votes">{comment.voteScore}</span><div>Score</div></div>
          <div className="icon-container" onClick={() => this.props.voteOnComment(comment.id, true)}><i className="icon thumbsup"/><div>Nice</div></div>
          <div className="icon-container" onClick={() => this.props.voteOnComment(comment.id, false)}><i className="icon thumbsdown"/><div>Bad</div></div>
          <div className="icon-container" onClick={() => this.props.deleteComment(comment.id)}><i className="icon delete"/><div>Delete</div></div>
        </div>
      </section>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    voteOnComment: (commentId, isUpVote) => dispatch(voteOnComment(commentId, isUpVote)),
    deleteComment: (commentId) => dispatch(deleteComment(commentId))
  }
}

function mapStateToProps({comments}) {
  return {comments}
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
