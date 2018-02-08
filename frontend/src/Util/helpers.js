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
 * @description Removes whitespace from both ends of a string
 * @param {string} string
 * @return {string}
 */
export function removeSpace (string) {
  return string.trim()
}
/**
 * @description Sort posts array by date
 * @param {array} arrayPosts - Posts array
 * @param {string} typeOrder - Type order can be "ASC" or "DESC"
 * @param {string} propertySort - Property that is going to sort
 * @return {Object}
 */
export function sortBy (arrayPosts, typeOrder, propertySort) {
  let tempPost
  let objPosts = {}
  for (let i = 0; i < arrayPosts.length; i++) {
    tempPost = arrayPosts[i]    
    for (let y = i; y < arrayPosts.length; y++) {
      if (typeOrder === 'ASC') {
        tempPost[propertySort] > arrayPosts[y][propertySort] &&
        (
          tempPost = arrayPosts[y],
          arrayPosts[y] = arrayPosts[i],
          arrayPosts[i] = tempPost
        )
      }
      else {
        tempPost[propertySort] < arrayPosts[y][propertySort] &&
        (
          tempPost = arrayPosts[y],
          arrayPosts[y] = arrayPosts[i],
          arrayPosts[i] = tempPost
        )
      }   
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
  if (typeBrief === 'postList' || typeBrief === 'postCategory') {
    let position
    if (body.length > 56) {
      for (let i = 0; i < body.length; i++) {
        if (i <= 56)
          newBody += body[i]
        if (i === 56)
          break
      }
      if (newBody[56] !== ' ' && newBody[56] !== '.' && newBody[56] !== ',') {
        for (let i = newBody.length; i > 0; i--) {
          if (newBody[i] === ' ' || newBody[i] === '.' || newBody[i] === ',') {
            position = i
            break
          }
        }
      }
      if (position !== 0)
        newBody = newBody.slice(0, position) + ' '
    }
    else
      newBody = body + ' '
  }
  else
    newBody = body
  return newBody
}

/**
 * @description Validate that the field is only letter and space
 * @param {string} field
 * @return {bool}
 */
export function validateLetter (field) {
  const expressionJustLetter = /^[A-Za-z ]+$/
  return expressionJustLetter.test(removeSpace(field))
}