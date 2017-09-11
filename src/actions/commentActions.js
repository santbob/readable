import * as API from '../api'
import * as ACTIONS from './types'

import {loadingData} from './index'

export const loadCommentsForPost = (postId) => dispatch => {
    dispatch(loadingData(true))
    return API.getCommentsForPost(postId).then((comments) => {
      dispatch({type: ACTIONS.COMMENTS_FOR_POST_LOADED, comments})
      dispatch(loadingData(false))
    })
}

export function commentAdded(comment) {
  return {type: ACTIONS.COMMENT_ADDED, comment}
}

export function commentUpdated(comment) {
  return {type: ACTIONS.COMMENT_UPDATED, comment}
}

export function commentDeleted(comment) {
  return {type: ACTIONS.COMMENT_DELETED, comment}
}

export function showCommentForm(comment) {
  return {type: ACTIONS.SHOW_COMMENT_FORM, comment}
}

export function hideCommentForm() {
  return {type: ACTIONS.HIDE_COMMENT_FORM}
}

export const voteOnComment = (commentId, isUpVote) => dispatch => {
    dispatch(loadingData(true))
    return API.voteOnComment(commentId, isUpVote).then((comment) => {
      dispatch({type: ACTIONS.COMMENT_VOTED, comment})
      dispatch(loadingData(false))
    })
}

export const deleteComment = (commentId) => dispatch => {
    dispatch(loadingData(true))
    return API.deleteComment(commentId).then((comment) => {
      dispatch({type: ACTIONS.COMMENT_DELETED, comment})
      dispatch(loadingData(false))
    })
}
