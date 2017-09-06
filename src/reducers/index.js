import {
  POSTS_LOADED,
  CATEGORIES_LOADED,
  POSTS_BY_CATEGORY_LOADED,
  COMMENTS_FOR_POST_LOADED,
  SHOWING_POSTS_FOR_CATEGORY,
  LOADING_DATA,
  SORT_POSTS_BY,
  POST_VOTED,
  COMMENT_VOTED,
  POST_ADDED,
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
  const { posts, post, type} = action
  switch (type) {
    case POSTS_LOADED:
      return posts
    case POSTS_BY_CATEGORY_LOADED:
      return posts
    case POST_ADDED:
      state.push(post)
      return state
    case POST_VOTED:
      state && state.forEach((p, index) => {
        if(p.id === post.id) {
          state[index] = post
        }
      })
      return state
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
    case COMMENT_VOTED:
      const { comment } = action
      const cmts = state[comment.parentId]
      cmts && cmts.forEach((c, index) => {
        if(c.id === comment.id) {
          cmts[index] = comment
        }
      })
      return {
        ...state,
        [comment.parentId] : cmts
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

export function sortPostsBy(state = '', action) {
  switch (action.type) {
    case SORT_POSTS_BY:
      return action.sortBy
    default:
      return state;
  }
}
