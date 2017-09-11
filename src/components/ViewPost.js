import React, {Component} from 'react';

import {loadAllPosts} from '../actions/postActions'
import {loadCommentsForPost, showCommentForm, hideCommentForm, commentAdded, commentUpdated} from '../actions/commentActions'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
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
    ReactModal.setAppElement('#root');
  }

  openCommentModal = () => {
    this.props.showCommentForm()
  }

  closeCommentModal = () => {
    this.props.hideCommentForm()
  }

  onAddComment = ({body, author, id}) => {
    const {commentAdded, commentUpdated, match} = this.props
    const postId = (match && match.params && match.params.postId)
      ? match.params.postId
      : null
    if (body && author && postId) {
      if(id) {
        API.editComment(id, body).then((c) => {
          commentUpdated(c)
          this.closeCommentModal()
        })
      } else {
        API.addComment(body, author, postId).then((c) => {
          commentAdded(c)
          this.closeCommentModal()
        })
      }
    }
  }

  componentDidMount() {
    const {posts,match, loadCommentsForPost,loadAllPosts} = this.props
    const postId = (match && match.params && match.params.postId)
      ? match.params.postId
      : null

    if(!posts || !posts[postId]) {
      console.log('triggering all posts')
      loadAllPosts()
    }

    loadCommentsForPost(postId)
  }
  render() {
    const {posts, match, comments, commentModal} = this.props

    const postId = (match && match.params && match.params.postId)
      ? match.params.postId
      : null

    const post = posts[postId]

    const postDeleted = (post && post.deleted)? <div>Post doesnt exists. checkout other <Link to={"/"}>posts</Link>.</div> : ''
    const commentsForPost = Object.values(comments).filter(comment => comment.parentId === postId && !comment.deleted)

    const commentsCount = (commentsForPost && commentsForPost.length)? <span>&#40;{commentsForPost.length}&#41;</span> : ''

    return (
      <div>
        {post && !post.deleted && (<div><Post post={post} showReadMore={false} showEdit={true}/>
        <section>
          <div className="comments-section-title">Comments {commentsCount} <div className="pure-button comment-add" onClick={this.openCommentModal}><span className="icon add"></span><span>Add Comment</span></div></div>
          {commentsForPost && commentsForPost.map((comment) => (<Comment comment={comment} key={comment.id}/>))}
          <ReactModal className='Modal' overlayClassName='Overlay' isOpen={commentModal && commentModal.isOpen} onRequestClose={this.closeCommentModal} contentLabel='Modal'>
            {commentModal && commentModal.isOpen && <CommentForm submitBtnText={commentModal.comment? 'Update' : 'Publish'} onSubmit={this.onAddComment} comment={commentModal.comment} post={post} onClose={this.closeCommentModal}/>}
          </ReactModal>
        </section></div>)}
        {postDeleted}
      </div>
    );
  }
}

function mapStateToProps({posts, loadingData, comments, commentModal}) {
  console.log('mapStateToProps')
  console.log(posts)
  return {posts, loadingData, comments, commentModal}
}

export default connect(mapStateToProps, {loadAllPosts,loadCommentsForPost, showCommentForm, hideCommentForm, commentAdded, commentUpdated})(ViewPost)
