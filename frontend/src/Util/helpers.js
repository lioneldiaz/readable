/**
 * @description Generate unique key
 */
export function generateKey () {
  return new Date() + Math.random().toString(36).substr(-8)
}