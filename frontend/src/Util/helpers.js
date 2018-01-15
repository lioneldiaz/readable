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