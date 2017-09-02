import * as API from '../api'

export const POSTS_LOADED = 'POSTS_LOADED'
export const CATEGORIES_LOADED = 'CATEGORIES_LOADED'
export const POSTS_BY_CATEGORY_LOADED = 'POSTS_BY_CATEGORY_LOADED'
export const COMMENTS_FOR_POST_LOADED = 'COMMENTS_FOR_POST_LOADED'
export const SHOWING_POSTS_FOR_CATEGORY = 'SHOWING_POSTS_FOR_CATEGORY'
export const LOADING_DATA = 'LOADING_DATA'
export const SORT_POSTS_BY = 'SORT_POSTS_BY'
export const POST_VOTED = 'POST_VOTED'


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
      dispatch({type: COMMENTS_FOR_POST_LOADED, postId, comments})
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
