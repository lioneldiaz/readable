/**
 * @description Generate unique key
 * @return {string}
 */
export function generateKey () {
  return Date.now() + Math.random().toString(36).substr(-10)
}