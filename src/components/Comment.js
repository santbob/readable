import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import * as utils from '../utils'
import {voteOnComment} from '../actions'
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
          <span className="votes">{comment.voteScore}</span>
          <span className="icon thumbsup" onClick={() => this.props.voteOnComment(comment.id, true)}></span>
          <span className="icon thumbsdown"  onClick={() => this.props.voteOnComment(comment.id, false)}></span>
        </div>
      </section>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    voteOnComment: (commentId, isUpVote) => dispatch(voteOnComment(commentId, isUpVote))
  }
}

function mapStateToProps({comments}) {
  return {comments}
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
