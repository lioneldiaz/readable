const api = 'http://localhost:3001'

let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-10)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getAll = (idPost) =>
  fetch(`${api}/posts/${idPost}/comments`, { headers })
    .then(result => result.json())
    .then(data => data)

export const create = (comment) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  }).then(result => result.json())

export const edit = (comment) =>
 fetch(`${api}/comments/${comment.id}`, {
   method: 'PUT',
   headers: {
     ...headers,
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(comment)
 }).then(result => result.json())

export const vote = (idComment, option) =>
 fetch(`${api}/comments/${idComment}`, {
   method: 'POST',
   headers: {
     ...headers,
     'Content-Type': 'application/json'
   },
   body: JSON.stringify({option})
 }).then(result => result.json())
   .then(data => data)

export const remove = (comment) =>
  fetch(`${api}/comments/${comment.id}`, {
    method: 'DELETE',
    headers
  })
  .then(result => result.json())
  .then(data => data)
