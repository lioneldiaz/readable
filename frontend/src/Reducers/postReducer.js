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
function updateObject (oldObject, newValues) {
  return {
    ...oldObject,
    ...newValues
  }
}
function getPosts (state, action) {
  const { posts } = action
  const getP = {
    ...state,
    posts: posts
  }      
  return updateObject(state, getP)
}
function detailsPost (state, action) {
  const { postId } = action
  const detailsP = {
        ...state,
        postDetails: postId
  }
  return updateObject(state, detailsP)
}
function addPost (state, action) {
  const { newPost } = action
  const addP = {
    ...state,
    posts: {...state.posts, [newPost.id]: newPost}
  }
  return updateObject(state, addP)
}
function editPost (state, action) {
  const { id, title, body } = action      
  typeof state.posts[id] === 'object' && (
    state.posts[id].title = title,
    state.posts[id].body = body
  )
  state.postDetails.title = title
  state.postDetails.body = body
  const editP = {
    ...state,
    posts: state.posts,
    postDetails: state.postDetails
  }
  return updateObject(state, editP)
}
function removePost (state, action) {
  const { idPost, typeRemove } = action
  typeRemove === 'postCategory' && delete state.postDetails[idPost]
  delete state.posts[idPost]
  const newPosts = {
    ...state,
    posts: state.posts
  }
  return updateObject(state, newPosts)
}
function upDownVotePost (state, action) {
  const { numberVote, idPostVote, typeVote } = action      
  typeVote !== 'postList'
  ? (
      typeVote === 'postDetails'
      ? state.postDetails.voteScore = numberVote
      : state.postDetails[idPostVote].voteScore = numberVote,
      typeof state.posts[idPostVote] === 'object' && (state.posts[idPostVote].voteScore = numberVote)          
  )
  : state.posts[idPostVote].voteScore = numberVote
  const upDownVote = {
    ...state,
    postDetails: state.postDetails,
    posts: state.posts
  }
  return updateObject(state, upDownVote)   
}
function updateNumberCommentPost (state, action) {
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
  const updateNumber = {
    ...state,
    postDetails: state.postDetails,
    posts: state.posts
  }
  return updateObject(state, updateNumber)
}
function sortDatePost (state, action) {
  const { sortPosts } = action
  const sortP = {
    ...state,
    posts: sortPosts
  }
  return updateObject(state, sortP)
}
function getPostByCategory (state, action) {
  const { postsByCategory } = action
  const getByCategory = {
    ...state,
    postDetails: postsByCategory
  }
  return updateObject(state, getByCategory)
}
/**
 * @description Reducer for post
 * @param {Object} state - Contains information about the posts
 * @param {Object} action - Contains information about what action is executed
 */
export function posts (state = initialPosts, action) {
  switch (action.type) {
    case GET_POSTS : return getPosts (state, action)      
    case DETAIL_POST : return detailsPost (state, action)      
    case REMOVE_POST : return removePost (state, action)
    case ADD_POST : return addPost (state, action)      
    case EDIT_POST : return editPost (state, action)      
    case UP_DOWN_VOTE_POST : return upDownVotePost (state, action)            
    case UPDATE_NUMBER_COMMENT : return updateNumberCommentPost (state, action)      
    case SORT_DATE : return sortDatePost (state, action)      
    case GET_POST_BY_CATEGORY : return getPostByCategory (state, action)      
    default : return state
  }
}