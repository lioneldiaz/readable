import { GET_POSTS } from '../Actions/postAction'

/**
 * @description Initial state for all of posts
 */
const initialPosts = { 
  posts: []
}

/**
 * @description Reducer for post
 * @param {Object} state - Contains information about the posts
 * @param {Object} action - Contains information about what action is executed
 */
export function posts (state = initialPosts, action) {
  switch (action.type) {
    case GET_POSTS:
      const { posts } = action
      return {
        ...state,
        posts
      }
    default:
      return state
  }
}