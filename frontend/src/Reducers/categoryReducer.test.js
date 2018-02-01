import { categories } from './categoryReducer'
import * as types from '../Constans/ActionTypesComment'

describe('categories reducer', () => {
  it ('should return initial state', () => {
    expect (categories (
      {},
      {}
    )).toEqual ({})
  })

  it ('should handle GET_CATEGORIES', () => {
    expect (categories (
      {
        '0': {
            name: 'react',
            path: 'react'
          },
          '1': {
            name: 'redux',
            path: 'redux'
          },
          '2': {
            name: 'udacity',
            path: 'udacity'
          }       
      },
      {
        type: types.GET_CATEGORIES,
        categories: {
         '0': {
            name: 'react',
            path: 'react'
          },
          '1': {
            name: 'redux',
            path: 'redux'
          },
          '2': {
            name: 'udacity',
            path: 'udacity'
          }
        }
      }
    )).toEqual({
     '0': {
        name: 'react',
        path: 'react'
      },
      '1': {
        name: 'redux',
        path: 'redux'
      },
      '2': {
        name: 'udacity',
        path: 'udacity'
      }
    })
  })
})