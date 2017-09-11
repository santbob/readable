import * as API from '../api'
import * as ACTIONS from './types'
import {loadingData} from './index'

export const loadPostForCategory = (category) => dispatch => {
    dispatch(loadingData(true))
    return API.getAllPostsInCategory(category).then((posts) => {
      dispatch({type: ACTIONS.POSTS_BY_CATEGORY_LOADED, posts})
      dispatch({type: ACTIONS.SHOWING_POSTS_FOR_CATEGORY, category})
      dispatch(loadingData(false))
    })
}

export const loadAllPosts = () => dispatch => {
    dispatch(loadingData(true))
    return API.getAllPosts().then((posts) => {
      dispatch({type: ACTIONS.POSTS_LOADED, posts})
      dispatch(loadingData(false))
    })
}

export function postAdded(post) {
  return {type: ACTIONS.POST_ADDED, post}
}

export function postUpdated(post) {
  return {type: ACTIONS.POST_UPDATED, post}
}

export const voteOnPost = (postId, isUpVote) => dispatch => {
    dispatch(loadingData(true))
    return API.voteOnPost(postId, isUpVote).then((post) => {
      dispatch({type: ACTIONS.POST_VOTED, post})
      dispatch(loadingData(false))
    })
}

export const deletePost = (postId) => dispatch => {
    dispatch(loadingData(true))
    return API.deletePost(postId).then((post) => {
      dispatch({type: ACTIONS.POST_DELETED, post})
      dispatch(loadingData(false))
    })
}
