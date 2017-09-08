import * as API from '../api'

export const POSTS_LOADED = 'POSTS_LOADED'
export const CATEGORIES_LOADED = 'CATEGORIES_LOADED'
export const POSTS_BY_CATEGORY_LOADED = 'POSTS_BY_CATEGORY_LOADED'
export const COMMENTS_FOR_POST_LOADED = 'COMMENTS_FOR_POST_LOADED'
export const SHOWING_POSTS_FOR_CATEGORY = 'SHOWING_POSTS_FOR_CATEGORY'
export const LOADING_DATA = 'LOADING_DATA'
export const SORT_POSTS_BY = 'SORT_POSTS_BY'
export const POST_VOTED = 'POST_VOTED'
export const POST_ADDED = 'POST_ADDED'
export const POST_UPDATED = 'POST_UPDATED'
export const POST_DELETED = 'POST_DELETED'

export const COMMENT_VOTED = 'COMMENT_VOTED'
export const COMMENT_ADDED = 'COMMENT_ADDED'
export const COMMENT_UPDATED = 'COMMENT_UPDATED'
export const COMMENT_DELETED = 'COMMENT_DELETED'


export function loadingData(isLoading) {
  return {type: LOADING_DATA, isLoading}
}

export const loadAllPosts = () => dispatch => {
    dispatch(loadingData(true))
    return API.getAllPosts().then((posts) => {
      dispatch({type: POSTS_LOADED, posts})
      dispatch(loadingData(false))
    })
}

export const loadCategories = () => dispatch => {
    dispatch(loadingData(true))
    return API.getCategories().then((categories) => {
      dispatch({type: CATEGORIES_LOADED, categories})
      dispatch(loadingData(false))
    })
}

export const loadCommentsForPost = (postId) => dispatch => {
    dispatch(loadingData(true))
    return API.getCommentsForPost(postId).then((comments) => {
      dispatch({type: COMMENTS_FOR_POST_LOADED, comments})
      dispatch(loadingData(false))
    })
}

export const loadPostForCategory = (category) => dispatch => {
    dispatch(loadingData(true))
    return API.getAllPostsInCategory(category).then((posts) => {
      dispatch({type: POSTS_BY_CATEGORY_LOADED, posts})
      dispatch({type: SHOWING_POSTS_FOR_CATEGORY, category})
      dispatch(loadingData(false))
    })
}

export function sortBy(sortBy) {
    return {type: SORT_POSTS_BY, sortBy}
}

export const voteOnPost = (postId, isUpVote) => dispatch => {
    dispatch(loadingData(true))
    return API.voteOnPost(postId, isUpVote).then((post) => {
      dispatch({type: POST_VOTED, post})
      dispatch(loadingData(false))
    })
}

export const deletePost = (postId) => dispatch => {
    dispatch(loadingData(true))
    return API.deletePost(postId).then((post) => {
      dispatch({type: POST_DELETED, post})
      dispatch(loadingData(false))
    })
}

export const voteOnComment = (commentId, isUpVote) => dispatch => {
    dispatch(loadingData(true))
    return API.voteOnComment(commentId, isUpVote).then((comment) => {
      dispatch({type: COMMENT_VOTED, comment})
      dispatch(loadingData(false))
    })
}

export const deleteComment = (commentId) => dispatch => {
    dispatch(loadingData(true))
    return API.deleteComment(commentId).then((comment) => {
      dispatch({type: COMMENT_DELETED, comment})
      dispatch(loadingData(false))
    })
}

export function postCreated(post) {
  return {type: POST_ADDED, post}
}

export function postUpdated(post) {
  return {type: POST_UPDATED, post}
}

export function postDeleted(post) {
  return {type: POST_DELETED, post}
}

export function commentCreated(comment) {
  return {type: COMMENT_ADDED, comment}
}

export function commentUpdated(comment) {
  return {type: COMMENT_UPDATED, comment}
}

export function commentDeleted(comment) {
  return {type: COMMENT_DELETED, comment}
}
