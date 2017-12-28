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

export const getByCategory = (category) =>  
  fetch(`${api}/${category}/posts`, { headers })
    .then(result => result.json())
    .then(data => data)