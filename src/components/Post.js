import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import * as utils from '../utils'
import {voteOnPost} from '../actions'
import {connect} from 'react-redux';


class Post extends Component {
  render() {
    const {post, showReadMore} = this.props
    const readMore = (showReadMore)? <span><Link to={`${post.category}/${post.id}`}>read more...</Link></span> : ''
    return (
      <section className="post" key={post.id}>
        <header className="post-header">
            <h2 className="post-title">{post.title}</h2>
            <p className="post-meta">
                By <span className="post-author">{post.author}</span> under <Link to={`${post.category}`} className="post-category post-category-design">{post.category}</Link> on {utils.printDate(post.timestamp)}
            </p>
        </header>
        <div className="post-description">
            <p>{post.body} {readMore}</p>
        </div>
        <div>
          <span className="votes">{post.voteScore}</span>
          <span className="icon thumbsup" onClick={() => this.props.voteOnPost(post.id, true)}></span>
          <span className="icon thumbsdown"  onClick={() => this.props.voteOnPost(post.id, false)}></span>
        </div>
      </section>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    voteOnPost: (postId, isUpVote) => dispatch(voteOnPost(postId, isUpVote))
  }
}

function mapStateToProps({posts}) {
  return {posts}
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
