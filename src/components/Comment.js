import React, { Component } from 'react';
import * as utils from '../utils'
import * as commentActions from '../actions/commentActions'
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
          <div className="icon-container" title="Comment Score">Score <span className="votes">{comment.voteScore}</span></div>
          <span title="Up vote the comment" className="icon thumbsup" onClick={() => this.props.voteOnComment(comment.id, true)}>Nice</span>
          <span title="Down vote the comment" className="icon thumbsdown" onClick={() => this.props.voteOnComment(comment.id, false)}>Bad</span>
          <span title="Delete this comment" className="icon delete" onClick={() => this.props.deleteComment(comment.id)}>Delete</span>
          <span title="Edit this comment" className="icon edit"  onClick={() => this.props.showCommentForm(comment)}>Edit</span>
        </div>
      </section>
    );
  }
}

function mapStateToProps({comments}) {
  return {comments}
}

export default connect(mapStateToProps, commentActions)(Comment)
