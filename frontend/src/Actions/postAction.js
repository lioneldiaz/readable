import * as postsAPI from '../Util/postsAPI'
import { sortBy } from '../Util/helpers'
import {
  GET_POSTS,
  GET_POST_BY_CATEGORY,
  ADD_POST,
  EDIT_POST,
  REMOVE_POST,
  DETAIL_POST,
  UP_DOWN_VOTE_POST,
  UPDATE_NUMBER_COMMENT,
  SORT
} from '../Constans/ActionTypesComment'
/**
 * @description Action creators
 */
export function upDownVote (numberVote, idPostVote, typeVote) {
  return {
    type: UP_DOWN_VOTE_POST,
    numberVote,
    idPostVote,
    typeVote
  }
}
export function fetchUpDownVotePost (post, option, typeVote) {
  return dispatch => {
    postsAPI
      .vote(post, option)
      .then(post => dispatch(upDownVote(post.voteScore, post.id, typeVote)))
  }
}

export function getPosts (objPosts) {
  let posts = {}
  Object.keys(objPosts).map(key => posts[objPosts[key].id] = objPosts[key])
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

export function removePost (idPost, typeRemove) {
  return {
    type: REMOVE_POST,
    idPost,
    typeRemove
  }
}
export function fetchRemovePost (post, typeRemove) {
  return dispatch => {
    postsAPI
      .remove(post)
      .then(post => dispatch(removePost(post.id, typeRemove)))
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
    body: editPost.body,
    timestamp: editPost.timestamp
  }
}
export function fetchEditPost (post) {
  return dispatch => {
    postsAPI
    .edit(post)
    .then(post => dispatch(editPost(post)))
  }
}

export function updateNumberComment (idPostComment, typeUpdate) {
  return {
    type: UPDATE_NUMBER_COMMENT,
    idPostComment,
    typeUpdate
  }
}

export function sortDate (sortPosts) {
  return {
    type: SORT,
    sortPosts
  }
}
export function goSortDate (posts, typeSort, propertySort) {
  return dispatch => {    
    dispatch(sortDate(sortBy(posts, typeSort, propertySort)))
  }
}

export function getPostByCategory (posts) {
  let postsByCategory = {}
  Object.keys(posts).map(key => postsByCategory[posts[key].id] = posts[key])
  return {
    type: GET_POST_BY_CATEGORY,
    postsByCategory
  }
}
export function fetchPostByCategory (category) {
  return dispatch => {
    postsAPI
      .getPostByCategory(category)
      .then(posts => dispatch(getPostByCategory(posts)))
  }
}