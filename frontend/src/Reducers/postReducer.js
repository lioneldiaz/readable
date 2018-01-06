import { 
  GET_POSTS, 
  REMOVE_POST,
  ADD_POST,
  DETAIL_POST,
  EDIT_POST
} from '../Actions/postAction'

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
  const { posts, idPost, newPost, editPost, postId } = action  
  switch (action.type) {
    case GET_POSTS :         
      return {
        ...state,
        posts
      }
    case DETAIL_POST :
      return {
        ...state,
        posts: [...state.posts, postId]
      }
    case REMOVE_POST :
      return {
        ...state,
        posts: [...state.posts.filter(post => post.id !== idPost)]
      }
    case ADD_POST :
      return {
        ...state,
        posts: [...state.posts, newPost]
      }
    case EDIT_POST :
      return {
        ...state,
        posts: [...state.posts, editPost]
      }
    default:
      return state
  }
}