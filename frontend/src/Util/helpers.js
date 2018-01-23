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