import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import * as utils from '../utils'
import * as postActions from '../actions/postActions'
import {connect} from 'react-redux';


class Post extends Component {

  render() {
    const {post, showShortVersion, showEdit} = this.props
    const readFull = (post && showShortVersion)? <span><Link to={`${post.category}/${post.id}`}><span className="icon right-arrow" title="Read full post"></span></Link></span> : ''
    const editLink = (post && showEdit)? <div className="icon-container"><Link to={`/${post.category}/${post.id}/edit`}><i className="icon edit" title="Edit this post"/><div className="icon-desc">Edit</div></Link></div> : ''
    return (
      <div>
        {post && (<section className="post">
          <header className="post-header">
              <h2 className="post-title">{post.title}</h2>
              <p className="post-meta">
                  By <span className="post-author">{post.author}</span> under <Link to={`${post.category}`} className="post-category post-category-design">{post.category}</Link> on {utils.printDate(post.timestamp)}
              </p>
          </header>
          <div className="post-description">
              <p>{showShortVersion ? utils.truncate(post.body, 50) : post.body} {readFull}</p>
          </div>
          <div>
            <div className="icon-container" title="Post Score"><span className="votes">{post.voteScore}</span><div className="icon-desc">Score</div></div>
            <div className="icon-container" onClick={() => this.props.voteOnPost(post.id, true)}><i className="icon thumbsup" title="Up vote the post"/><div className="icon-desc">Nice</div></div>
            <div className="icon-container" onClick={() => this.props.voteOnPost(post.id, false)}><i className="icon thumbsdown" title="Down vote the post"/><div className="icon-desc">Bad</div></div>
            <div className="icon-container" onClick={() => this.props.deletePost(post.id)}><i className="icon delete" title="Delete this Post"/><div className="icon-desc">Delete</div></div>
            {editLink}
          </div>
        </section>)}
      </div>
    );
  }
}

function mapStateToProps({posts}) {
  return {posts}
}

export default connect(mapStateToProps, postActions)(Post)
