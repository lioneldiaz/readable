import * as commentsAPI from '../Util/commentsAPI'
/**
 * @description Action types
 */
export const GET_COMMENTS = 'GET_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'

/**
 * @description Action creators
 */
export function getComments (comments) {
  return {
    type: GET_COMMENTS,
    comments
  }
}
export function fetchComments (idPost) {
  return dispatch =>
    commentsAPI
      .getAll(idPost)
      .then(comments => dispatch(getComments(comments)))
}

export function addComment (newComment) {
  return {
    type: ADD_COMMENT,
    newComment
  }
}
export function fetchAddComment (commnet) {
  return dispatch =>
    commentsAPI
      .create(commnet)
      .then(comment => dispatch(addComment(comment)))
}

export function editComment (comment) {
  return {
    type: EDIT_COMMENT,
    idEditComment: comment.id,
    timestampEditComment: comment.timestamp,
    bodyEditComment: comment.body
  }
}
export function fetchEditComment (comment) {
  return dispatch =>
    commentsAPI
      .edit(comment)
      .then(comment => dispatch(editComment(comment)))
}

export function removeComment (idComment) {
  return {
    type: REMOVE_COMMENT,
    idComment
  }
}
export function fetchRemoveComment (comment) {
  return dispatch =>
    commentsAPI
      .remove(comment)
      .then(comment => dispatch(removeComment(comment.id)))
}