import { 
  GET_POSTS, 
  REMOVE_POST,
  ADD_POST,
  DETAIL_POST,
  EDIT_POST,
  UPDATE_NUMBER_COMMENT,
  UPDOWNVOTE
} from '../Actions/postAction'

/**
 * @description Initial state for all of posts
 */
const initialPosts = { 
  posts: [],
  post: {}
}

/**
 * @description Reducer for post
 * @param {Object} state - Contains information about the posts
 * @param {Object} action - Contains information about what action is executed
 */
export function posts (state = initialPosts, action) {
  switch (action.type) {
    case GET_POSTS :
      const { posts } = action        
      return {
        ...state,
        posts
      }
    case DETAIL_POST :
      const { postId } = action
      return {
        ...state,
        post: postId
      }
    case REMOVE_POST :
      const { idPost } = action
      return {
        ...state,
        posts: [...state.posts.filter(post => post.id !== idPost)]
      }
    case ADD_POST :
      const { newPost } = action
      return {
        ...state,
        posts: [...state.posts, newPost]
      }
    case EDIT_POST :
      const { id, title, body } = action
      return {
        ...state,
        posts: state.posts.map(post => {
                post.id === id && ( post.title = title, post.body = body )
                return post
                })
      }
    case UPDOWNVOTE :
      const { numberVote, idPostVote } = action
      return {
        ...state,
        posts: state.posts.map(post => {
                post.id === idPostVote && ( post.voteScore = numberVote )
                return post
               })
      }
    case UPDATE_NUMBER_COMMENT :
      const { idPostComment, typeUpdate } = action
      return {
        ...state,
        post: {...state.post, ...state.post.id === idPostComment && (
          typeUpdate === 'increase' ? state.post.commentCount++ :state.post.commentCount--)}
      }
    default:
      return state
  }
}