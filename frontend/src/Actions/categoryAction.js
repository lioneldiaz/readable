import * as categoryAPI from '../Util/categoriesAPI'
import { GET_CATEGORIES } from '../Constans/ActionTypesComment'
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