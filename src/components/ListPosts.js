import React, {Component} from 'react';

import {loadAllPosts, loadCategories, sortBy, voteOnPost} from '../actions'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import * as utils from '../utils'

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
          return (a.timestamp < b.timestamp)
            ? -1
            : 1
        } else {
          return (a.voteScore < b.voteScore)
            ? -1
            : 1
        }
      })
    }

    console.log(JSON.stringify(filteredPosts))

    return (

        <div className="posts">
          {filteredPosts && filteredPosts.map((post) => (
            <section className="post" key={post.id}>
              <header className="post-header">
                  <h2 className="post-title">{post.title}</h2>
                  <p className="post-meta">
                      By <span className="post-author">{post.author}</span> under <Link to={`${post.category}`} className="post-category post-category-design">{post.category}</Link> on {utils.printDate(post.timestamp)}
                  </p>
              </header>
              <div className="post-description">
                  <p>{post.body}</p>
              </div>
              <div>
                <span>{post.voteScore}</span>
                <span onClick={() => this.props.voteOnPost(post.id, true)}>ThumbsUp</span>
                <span onClick={() => this.props.voteOnPost(post.id, false)}>ThumbsDown</span>
              </div>
            </section>))}
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
