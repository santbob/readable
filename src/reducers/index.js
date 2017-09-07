import {
  POSTS_LOADED,
  CATEGORIES_LOADED,
  COMMENTS_FOR_POST_LOADED,
  SHOWING_POSTS_FOR_CATEGORY,
  LOADING_DATA,
  SORT_POSTS_BY,
  POST_VOTED,
  POST_ADDED,
  POST_UPDATED,
  POST_DELETED,
  COMMENT_VOTED,
  COMMENT_ADDED,
  COMMENT_UPDATED,
  COMMENT_DELETED
} from '../actions'

export function categories(state = [], action) {
  switch (action.type) {
    case CATEGORIES_LOADED:
      return action.categories
    default:
      return state
  }
}

export function posts(state = {}, action) {
  const { posts, post, type} = action
  switch (type) {
    case POSTS_LOADED:
      if(posts) {
        return posts.reduce((obj, p) => {
          obj[p.id] = p
          return obj
        }, {})
      }
      return state
    case POST_VOTED:
    case POST_ADDED:
    case POST_UPDATED:
      return {
        ...state,
        [post.id]: post
      }
    case POST_DELETED:
      delete state[post.id]
      return state
    default:
      return state
  }
}

export function comments(state = {}, action) {
  const {comments, comment} = action
  switch (action.type) {
    case COMMENTS_FOR_POST_LOADED:
      if(comments) {
        return comments.reduce((obj, c) => {
          obj[c.id] = c
          return obj
        }, {})
      }
      return state
    case COMMENT_VOTED:
    case COMMENT_ADDED:
    case COMMENT_UPDATED:
      return {
        ...state,
        [comment.id] : comment
      }
    case COMMENT_DELETED:
      delete state[comment.id]
      return state
    default:
      return state
  }
}

export function filterByCategory(state = '', action) {
  switch (action.type) {
    case SHOWING_POSTS_FOR_CATEGORY:
      return action.category
    default:
      return state
  }
}

export function loadingData(state = false, action) {
  switch (action.type) {
    case LOADING_DATA:
      return !!action.isLoading
    default:
      return state;
  }
}

export function sortPostsBy(state = '', action) {
  switch (action.type) {
    case SORT_POSTS_BY:
      return action.sortBy
    default:
      return state;
  }
}
