import { 
  GET_COMMENTS,
  ADD_COMMENT,
  EDIT_COMMENT,
  REMOVE_COMMENT,
  UPDOWNVOTE
} from '../Constans/ActionTypesComment'
/**
 * @description Initial state for all of comments
 */
const initialComments = {}
function updateObject (oldObject, newValues) {
  return {
    ...oldObject,
    ...newValues
  }
}
function getComments (state, action) {
  const { comments } = action
  state = {}
  return updateObject(state, comments)
}
function addComment (state, action) {
  const { newComment } = action
  const comment = {
    ...state.comments, [newComment.id]: newComment
  }
  return updateObject(state, comment)
}
function editComment (state, action) {
  const { idEditComment, timestampEditComment, bodyEditComment } = action
  state[idEditComment].body = bodyEditComment
  state[idEditComment].timestamp = timestampEditComment
  const comment = { ...state.comments }
  return updateObject(state, comment)
}
function removeComment (state, action) {
  const { idComment } = action
  delete state[idComment]
  const comment = { ...state.comments }
  return updateObject(state, comment)
}
function upDownVote (state, action) {
  const { idCommentVote, numberVoteScore } = action
  state[idCommentVote].voteScore = numberVoteScore
  const comment = { ...state.comments }
  return updateObject(state, comment)
}
/**
 * @description Reducer for comment
 * @param {Object} state - Contains information about the comments
 * @param {Object} action - Contains information about what action is executed
 */
export function comments (state = initialComments, action) {
  switch (action.type) {
    case GET_COMMENTS : return getComments (state, action)
    case ADD_COMMENT : return addComment (state, action)
    case EDIT_COMMENT : return editComment (state, action)
    case UPDOWNVOTE : return upDownVote (state, action)
    case REMOVE_COMMENT : return removeComment (state, action)  
    default : return state
  }
}