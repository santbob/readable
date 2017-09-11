import * as API from '../api'
import * as ACTIONS from './types'

export function loadingData(isLoading) {
  return {type: ACTIONS.LOADING_DATA, isLoading}
}

export const loadCategories = () => dispatch => {
    dispatch(loadingData(true))
    return API.getCategories().then((categories) => {
      dispatch({type: ACTIONS.CATEGORIES_LOADED, categories})
      dispatch(loadingData(false))
    })
}

export function sortBy(sortBy) {
    return {type: ACTIONS.SORT_POSTS_BY, sortBy}
}
