import {
  POSTS_LOADED,
  CATEGORIES_LOADED,
  POSTS_BY_CATEGORY_LOADED,
  COMMENTS_FOR_POST_LOADED,
  SHOWING_POSTS_FOR_CATEGORY,
  LOADING_DATA
} from '../actions'

export function categories(state = [], action) {
  switch (action.type) {
    case CATEGORIES_LOADED:
      return action.categories
    default:
      return state
  }
}

export function posts(state = [], action) {
  switch (action.type) {
    case POSTS_LOADED:
      return action.posts
    case POSTS_BY_CATEGORY_LOADED:
      return action.posts
    default:
      return state
  }
}

export function comments(state = {}, action) {
  switch (action.type) {
    case COMMENTS_FOR_POST_LOADED:
      const { postId, comments } = action
      return {
        ...state,
        [postId]: comments
      }
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
