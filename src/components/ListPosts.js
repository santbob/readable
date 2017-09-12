import React, {Component} from 'react';

import {loadAllPosts, voteOnPost} from '../actions/postActions'
import {loadCategories, sortBy} from '../actions'
import {connect} from 'react-redux';
import BreadCrumbs from './BreadCrumbs'
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

    if(category === 'addpost'){
      return <span/>
    }

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
          <BreadCrumbs url={match && match.url}/>
          <select className="sort-option" value={sortBy} onChange={(event) => this.props.sortBy(event.target.value)}>
            {sortOptions.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
          {filteredPosts && filteredPosts.map((post) => (
            <Post post={post} key={post.id} showShortVersion={true}/>
          ))}
        </div>
    );
  }
}

function mapStateToProps({posts, categories, filterByCategory, loadingData, sortPostsBy}) {
  return {posts, categories, filterByCategory, loadingData, sortPostsBy}
}

export default connect(mapStateToProps, {loadAllPosts, loadCategories, sortBy, voteOnPost})(ListPosts)
