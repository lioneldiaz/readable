import * as postsAPI from '../Util/postsAPI'

/**
 * @description Action types
 */
export const GET_POSTS = 'GET_POSTS'
export const GET_POST_BY_CATEGORY = 'GET_POST_BY_CATEGORY'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const DETAIL_POST = 'DETAIL_POST'

/**
 * @description Action creators
 */
 export function getPosts (posts) {
  return {
    type: GET_POSTS,
    posts
  }
 }

 export function fetchPosts () {
   return dispatch => {
     postsAPI
      .getAll()
      .then(posts => dispatch(getPosts(posts)))
   }
 }

 export function removePost (idPost) {
   return {
      type: REMOVE_POST,
      idPost,
   }
 }

 export function fetchRemovePost (post) {
  return dispatch => {
    postsAPI
      .remove(post)
      .then(post => dispatch(removePost(post.id)))
  }
 }