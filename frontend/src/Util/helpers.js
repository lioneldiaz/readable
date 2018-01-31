/**
 * @description Generate unique key
 * @return {string}
 */
export function generateKey () {
  return Date.now() + Math.random().toString(36).substr(-10)
}
/**
 * @description Convert a timestamp to date
 * @param {string} timestamp
 * @return {string}
 */
export function convertDate (timestamp) {  
  let date = new Date(timestamp)  
  return date.toDateString()
}
/**
 * @description Sort posts array by date
 * @param {array} arrayPosts - Posts array
 * @param {string} typeOrder - Type order can be "ASC" or "DESC"
 * @param {string} propertySort - Property that is going to sort
 * @return {Object}
 */
export function sortByDates (arrayPosts, typeOrder, propertySort) {
  let tempPost
  let index
  let refPost
  let objPosts = {}
  for (let i = 0; i < arrayPosts.length; i++) {
    tempPost = arrayPosts[i]    
    for (let y = i; y < arrayPosts.length; y++) {
      typeOrder === 'ASC'
      ?
        tempPost[propertySort] > arrayPosts[y][propertySort] &&
        (
          tempPost = arrayPosts[y],
          index = y,
          refPost = arrayPosts[i],
          arrayPosts[i] = tempPost,
          arrayPosts[index] = refPost
        )
      : tempPost[propertySort] < arrayPosts[y][propertySort] &&
        (
          tempPost = arrayPosts[y],
          index = y,
          refPost = arrayPosts[i],
          arrayPosts[i] = tempPost,
          arrayPosts[index] = refPost
        )
    }
    objPosts[arrayPosts[i].id] = tempPost
  }  
  return objPosts
}
/**
 * @description Cut a string if this contain more than 65 characters
 * @param {string} body A body string of the post
 * @param {string} typeBrief
 * @return {string}
 */
export function briefBody (body, typeBrief) {
  let newBody = ''
  if (typeBrief === 'postList') {
    let position
    if (body.length > 63) {
      for (let i = 0; i < body.length; i++) {
        if (i <= 63)
          newBody += body[i]
        if (i === 63)
          break
      }
      if (newBody[63] !== ' ' && newBody[63] !== '.' && newBody[63] !== ',') {
        for (let i = newBody.length; i > 0; i--) {
          if (newBody[i] === ' ' || newBody[i] === '.' || newBody[i] === ',') {
            position = i
            break
          }
        }
      }
      if (position !== 0)
        newBody = newBody.slice(0, position) + '..'
    }
    else
      newBody = body + '..'
  }
  else
    newBody = body
  return newBody
}