import * as categoryAPI from '../Util/categoriesAPI'

/**
 * @description Action types
 */
export const GET_CATEGORIES = 'GET_CATEGORIES'
/**
 * @description Action creators
 */
export function getCategories(categories) {  
  return {
    type: GET_CATEGORIES,
    categories
  }  
}

export function fetchCategories () {
  return dispatch => {
    categoryAPI
    .getAll()
    .then(catgories => dispatch(getCategories(catgories)))
  }  
}