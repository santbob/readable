import React, {Component} from 'react';

import {loadCommentsForPost, showCommentForm, hideCommentForm, commentAdded} from '../actions'
import {connect} from 'react-redux';

import Post from './Post'
import Comment from './Comment'
import CommentForm from './CommentForm'

import ReactModal from 'react-modal';

import * as API from '../api'

class ViewPost extends Component {

  constructor(props) {
    super(props);
    this.openCommentModal = this.openCommentModal.bind(this);
    this.closeCommentModal = this.closeCommentModal.bind(this);
    ReactModal.setAppElement('#layout');
  }

  openCommentModal = () => {
    this.props.showCommentForm()
  }

  closeCommentModal = () => {
    this.props.hideCommentForm()
  }

  onAddComment = ({body, author}) => {
    const {commentAdded, match} = this.props
    const postId = (match && match.params && match.params.postId)
      ? match.params.postId
      : null
    if (body && author && postId) {
      API.addComment(body, author, postId).then((c) => {
        commentAdded(c)
        this.closeCommentModal()
      })
    }
  }

  componentDidMount() {
    const {match, loadCommentsForPost} = this.props
    const postId = (match && match.params && match.params.postId)
      ? match.params.postId
      : null

    loadCommentsForPost(postId)
  }
  render() {
    const {posts, match, comments, commentModal} = this.props

    const postId = (match && match.params && match.params.postId)
      ? match.params.postId
      : null

    const post = posts[postId]

    const commentsForPost = Object.values(comments).filter(comment => comment.parentId === postId && !comment.deleted)

    return (
      <div>
        <Post post={post} showReadMore={false} showEdit={true}/>
        <div>
          <div>Responses <div className="icon-container" onClick={this.openCommentModal}><span className="icon add"></span><span>Add New Comment</span></div></div>
          {commentsForPost && commentsForPost.map((comment) => (<Comment comment={comment} key={comment.id}/>))}
          <ReactModal className='Modal' overlayClassName='Overlay' isOpen={commentModal && commentModal.isOpen} onRequestClose={this.closeCommentModal} contentLabel='Modal'>
            {commentModal && commentModal.isOpen && <CommentForm submitBtnText={commentModal.comment? 'Update' : 'Publish'} onSubmit={this.onAddComment} comment={commentModal.comment} post={post} onClose={this.closeCommentModal}/>}
          </ReactModal>
        </div>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    loadCommentsForPost: (postId) => dispatch(loadCommentsForPost(postId)),
    showCommentForm:() => dispatch(showCommentForm()),
    hideCommentForm:() => dispatch(hideCommentForm()),
    commentAdded:(comment) => dispatch(commentAdded(comment))
  }
}

function mapStateToProps({posts, loadingData, comments, commentModal}) {
  return {posts, loadingData, comments, commentModal}
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewPost)
