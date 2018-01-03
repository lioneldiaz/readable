const api = 'http://localhost:3001'

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
    post: JSON.stringify(post)
  }).then(result => result.json())

export const edit = (post) =>
  fetch(`${api}/posts/${post.id}`, { method: 'PUT', headers})
    .then(result => result.json())

export const detail = (id) =>
  fetch(`${api}/posts/${id}`, { headers })
    .then(result => result.json())
    .then(data => data)

export const remove = (post) =>
  fetch(`${api}/posts/${post.id}`, { method: 'DELETE', headers })
    .then(result => result.json())
    .then(data => data)

