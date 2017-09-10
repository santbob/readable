import React, { Component } from 'react';
import * as utils from '../utils'
import {voteOnComment, deleteComment, showCommentForm} from '../actions'
import {connect} from 'react-redux';


class Comment extends Component {
  render() {
    const {comment} = this.props
    return (
      <section className="comment" key={comment.id}>
        <header className="comment-header">
            <p className="comment-meta"><span className="comment-author">{comment.author}</span> on {utils.printDate(comment.timestamp)}</p>
        </header>
        <div className="comment-description">{comment.body}</div>
        <div className="comment-actions">
          <div className="icon-container">Score <span className="votes">{comment.voteScore}</span></div>
          <span className="icon thumbsup" onClick={() => this.props.voteOnComment(comment.id, true)}>Nice</span>
          <span className="icon thumbsdown" onClick={() => this.props.voteOnComment(comment.id, false)}>Bad</span>
          <span className="icon delete" onClick={() => this.props.deleteComment(comment.id)}>Delete</span>
          <span className="icon edit"  onClick={() => this.props.showCommentForm(comment)}>Edit</span>
        </div>
      </section>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    voteOnComment: (commentId, isUpVote) => dispatch(voteOnComment(commentId, isUpVote)),
    deleteComment: (commentId) => dispatch(deleteComment(commentId)),
    showCommentForm: (comment) => dispatch(showCommentForm(comment))
  }
}

function mapStateToProps({comments}) {
  return {comments}
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
