import { 
  GET_POSTS, 
  REMOVE_POST,
  ADD_POST,
  DETAIL_POST,
  EDIT_POST,
  UPDATE_NUMBER_COMMENT,
  UP_DOWN_VOTE_POST,
  SORT_DATE,
  GET_POST_BY_CATEGORY
} from '../Constans/ActionTypesComment'
/**
 * @description Initial state for all of posts
 */
const initialPosts = {
  posts: {},
  postDetails: {},
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
        posts: posts
      }
    case DETAIL_POST :
      const { postId } = action
      return {
        ...state,
        postDetails: postId
      }
    case REMOVE_POST :
      const { idPost, typeRemove } = action
      typeRemove === 'postCategory' && delete state.postDetails[idPost]
      delete state.posts[idPost]
      return {
        ...state,
        posts: state.posts
      }
    case ADD_POST :
      const { newPost } = action
      return {
        ...state,
        posts: {...state.posts, [newPost.id]: newPost}
      }
    case EDIT_POST :
      const { id, title, body } = action      
      typeof state.posts[id] === 'object' && (
        state.posts[id].title = title,
        state.posts[id].body = body
      )
      state.postDetails.title = title
      state.postDetails.body = body
      return {
        ...state,
        posts: state.posts,
        postDetails: state.postDetails
      }
    case UP_DOWN_VOTE_POST :
      const { numberVote, idPostVote, typeVote } = action      
      typeVote !== 'postList'
      ? (
          typeVote === 'postDetails'
          ? state.postDetails.voteScore = numberVote
          : state.postDetails[idPostVote].voteScore = numberVote,
          typeof state.posts[idPostVote] === 'object' && (state.posts[idPostVote].voteScore = numberVote)          
      )
      : state.posts[idPostVote].voteScore = numberVote
      return {
        ...state,
        postDetails: state.postDetails,
        posts: state.posts
      }          
    case UPDATE_NUMBER_COMMENT :
      const { idPostComment, typeUpdate } = action
      state.postDetails.id === idPostComment &&
        typeUpdate === 'increase'
        ? (
          state.postDetails.commentCount++,
          typeof state.posts[idPostComment] === 'object' && (state.posts[idPostComment].commentCount++)
        )
        : (
          state.postDetails.commentCount--,
          typeof state.posts[idPostComment] === 'object' && (state.posts[idPostComment].commentCount--)
        )      
      return {
        ...state,
        postDetails: state.postDetails,
        posts: state.posts
      }
    case SORT_DATE :
      const { sortPosts } = action
      return {
        ...state,
        posts: sortPosts
      }
    case GET_POST_BY_CATEGORY :
      const { postsByCategory } = action
      return {
        ...state,
        postDetails: postsByCategory
      }
    default:
      return state
  }
}