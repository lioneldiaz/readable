const api = process.env.REACT_APP_URL
let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-10)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getAll = () =>
  fetch(`${api}/posts`, { headers })
    .then(result => result.json())
    .then(data => data)

export const getPostByCategory = (category) => 
  fetch(`${api}/${category}/posts`, { headers })
    .then(result => result.json())
    .then(data => data)

export const create = (post) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(result => result.json())

export const edit = (post) =>
  fetch(`${api}/posts/${post.id}`, { 
    method: 'PUT', 
    headers:{
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(result => result.json())

export const details = (id) =>
  fetch(`${api}/posts/${id}`, { headers })
    .then(result => result.json())
    .then(data => data)

export const vote = (idPost, option) =>
  fetch(`${api}/posts/${idPost}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({option})
  }).then(result => result.json())
    .then(data => data)

export const remove = (post) =>
  fetch(`${api}/posts/${post.id}`, { method: 'DELETE', headers })
    .then(result => result.json())
    .then(data => data)

