import React, {Component} from 'react'
import * as postActions from '../actions/postActions'
import * as API from '../api'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import PostForm from './PostForm'
import BreadCrumbs from './BreadCrumbs'

class CreatePost extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit({title, body, author, category}) {
    const {postAdded, history: {push} } = this.props

    if (title && body && author && category) {
      API.addPost(title, body, author, category).then((post) => {
        postAdded(post)
        push("/")
      })
    }
  }

  render() {
    const {categories, match} = this.props
    return (
      <div>
        <BreadCrumbs url={match && match.url}/>
        <PostForm categories={categories} submitBtnText='Publish' onSubmit={this.onSubmit}/>
      </div>
    );
  }
}

function mapStateToProps({categories}) {
  return {categories}
}

export default connect(mapStateToProps, postActions)(CreatePost)
