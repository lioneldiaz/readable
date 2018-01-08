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

 export function getPostById (postId) {
   return {
     type: DETAIL_POST,
     postId
   }
 }
 export function fetchPostById (idPost) {
   return dispatch => {
     postsAPI
      .details(idPost)
      .then(post => dispatch(getPostById(post)))
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

 export function addPost (newPost) {
   return {
     type: ADD_POST,
     newPost
   }
 }
 export function fetchAddPost (post) {
   return dispatch => {
     postsAPI
      .create(post)
      .then(post => dispatch(addPost(post)))
   }
 }

 export function editPost (editPost) {
   return {
     type: EDIT_POST,
     id: editPost.id,
     title: editPost.title,
     body: editPost.body
   }
 }

 export function fetchEditPost (post) {
   return dispatch => {
     postsAPI
      .edit(post)
      .then(post => dispatch(editPost(post)))
   }
 }