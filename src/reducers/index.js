import * as ACTIONS from '../actions/types'

export function categories(state = [], action) {
  switch (action.type) {
    case ACTIONS.CATEGORIES_LOADED:
      return action.categories
    default:
      return state
  }
}

export function posts(state = {}, action) {
  const { posts, post, type} = action
  switch (type) {
    case ACTIONS.POSTS_LOADED:
      if(posts) {
        return posts.reduce((obj, p) => {
          obj[p.id] = p
          return obj
        }, {})
      }
      return state
    case ACTIONS.POST_VOTED:
    case ACTIONS.POST_ADDED:
    case ACTIONS.POST_UPDATED:
    case ACTIONS.POST_DELETED:
      return {
        ...state,
        [post.id]: post
      }
    default:
      return state
  }
}

export function comments(state = {}, action) {
  const {comments, comment} = action
  switch (action.type) {
    case ACTIONS.COMMENTS_FOR_POST_LOADED:
      if(comments) {
        return comments.reduce((obj, c) => {
          obj[c.id] = c
          return obj
        }, {})
      }
      return state
    case ACTIONS.COMMENT_VOTED:
    case ACTIONS.COMMENT_ADDED:
    case ACTIONS.COMMENT_UPDATED:
      return {
        ...state,
        [comment.id] : comment
      }
    case ACTIONS.COMMENT_DELETED:
      delete state[comment.id]
      return state
    default:
      return state
  }
}

export function filterByCategory(state = '', action) {
  switch (action.type) {
    case ACTIONS.SHOWING_POSTS_FOR_CATEGORY:
      return action.category
    default:
      return state
  }
}

export function loadingData(state = false, action) {
  switch (action.type) {
    case ACTIONS.LOADING_DATA:
      return !!action.isLoading
    default:
      return state;
  }
}

export function sortPostsBy(state = '', action) {
  switch (action.type) {
    case ACTIONS.SORT_POSTS_BY:
      return action.sortBy
    default:
      return state;
  }
}

export function commentModal(state = {}, action) {
  const {comment} = action
  switch (action.type) {
    case ACTIONS.SHOW_COMMENT_FORM:
      return {
        comment,
        isOpen: true
      }
    case ACTIONS.HIDE_COMMENT_FORM:
      return {
        isOpen: false
      }
    default:
      return state;
  }
}
