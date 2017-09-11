import React, {Component} from 'react';

import * as postActions from '../actions/postActions'

import {connect} from 'react-redux';

import PostForm from './PostForm'

import * as API from '../api'

class EditPost extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit({title, body, category}) {
    const {postUpdated, match, history: {push} } = this.props
    const postId = (match && match.params && match.params.postId)
      ? match.params.postId
      : null


    if (postId && title && body ) {
      API.editPost(postId, title, body).then((post) => {
        postUpdated(post)
        push("/" + category + "/" + postId)
      })
    }
  }

  render() {
    const {posts, match, categories} = this.props
    const postId = (match && match.params && match.params.postId)
      ? match.params.postId
      : null
    const post = posts[postId]

    return  (<PostForm categories={categories} submitBtnText='Update' onSubmit={this.onSubmit} post={post}/>);
  }
}

function mapStateToProps({posts, loadingData, categories}) {
  return {posts, loadingData, categories}
}

export default connect(mapStateToProps, postActions)(EditPost)
