import { GET_CATEGORIES } from '../Constans/ActionTypesComment'
/**
 * @description Initial state for all of categories
 */
const initailCategories = {}
/**
 * @description Reducer for category
 * @param {Object} state - Contains information about the categories
 * @param {Object} action - Contains information about what action is executed
 */
export function categories(state = initailCategories, action){
  switch (action.type) {
    case GET_CATEGORIES :
      const { categories } = action    
      return {
        ...state,
        ...categories
      }  
    default: return state
  }
}