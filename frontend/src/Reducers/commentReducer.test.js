import { comments } from './commentReducer'
import * as types from '../Constans/ActionTypesComment'

describe ('comment reducer', () => {
  it ('should return initial state', () => {
    expect (comments (
      {},
      {}
    )).toEqual({})
  })
  it ('should handle GET_COMMENTS', () => {
    expect (comments (
      {
        '894tuq4ut84ut8v4t8wun89g': {
          id: '894tuq4ut84ut8v4t8wun89g',
          parentId: '8xf0y6ziyjabvozdd253nd',
          timestamp: 1468166872634,
          body: 'Hi there! I am a COMMENT.',
          author: 'thingtwo',
          voteScore: 6,
          deleted: false,
          parentDeleted: false
        },
        '8tu4bsun805n8un48ve89': {
          id: '8tu4bsun805n8un48ve89',
          parentId: '8xf0y6ziyjabvozdd253nd',
          timestamp: 1469479767190,
          body: 'Comments. Are. Cool.',
          author: 'thingone',
          voteScore: -5,
          deleted: false,
          parentDeleted: false
        }
      },
      {
        type: types.GET_COMMENTS,
        comments: {
          '894tuq4ut84ut8v4t8wun89g': {
            id: '894tuq4ut84ut8v4t8wun89g',
            parentId: '8xf0y6ziyjabvozdd253nd',
            timestamp: 1468166872634,
            body: 'Hi there! I am a COMMENT.',
            author: 'thingtwo',
            voteScore: 6,
            deleted: false,
            parentDeleted: false
          },
          '8tu4bsun805n8un48ve89': {
            id: '8tu4bsun805n8un48ve89',
            parentId: '8xf0y6ziyjabvozdd253nd',
            timestamp: 1469479767190,
            body: 'Comments. Are. Cool.',
            author: 'thingone',
            voteScore: -5,
            deleted: false,
            parentDeleted: false
          }
        }
      }
    )).toEqual({
      '894tuq4ut84ut8v4t8wun89g': {
        id: '894tuq4ut84ut8v4t8wun89g',
        parentId: '8xf0y6ziyjabvozdd253nd',
        timestamp: 1468166872634,
        body: 'Hi there! I am a COMMENT.',
        author: 'thingtwo',
        voteScore: 6,
        deleted: false,
        parentDeleted: false
      },
      '8tu4bsun805n8un48ve89': {
        id: '8tu4bsun805n8un48ve89',
        parentId: '8xf0y6ziyjabvozdd253nd',
        timestamp: 1469479767190,
        body: 'Comments. Are. Cool.',
        author: 'thingone',
        voteScore: -5,
        deleted: false,
        parentDeleted: false
      }
    })
  })
  it ('should handle ADD_COMMENT', () => {
    expect (comments (
      { },
      {
        type: types.ADD_COMMENT,
        newComment: {
            id: '8tu4bsun805n8un48ve89',
            parentId: '8xf0y6ziyjabvozdd253nd',
            timestamp: 1469479767190,
            body: 'Comments. Are. Cool.',
            author: 'thingone',
            voteScore: -5,
            deleted: false,
            parentDeleted: false
        }
      }
    )).toEqual({      
      '8tu4bsun805n8un48ve89': {
        id: '8tu4bsun805n8un48ve89',
        parentId: '8xf0y6ziyjabvozdd253nd',
        timestamp: 1469479767190,
        body: 'Comments. Are. Cool.',
        author: 'thingone',
        voteScore: -5,
        deleted: false,
        parentDeleted: false
      }
    })
  })
  it ('should handle EDIT_COMMENT', () => {
    expect (comments (
      {
        '8tu4bsun805n8un48ve89': {
          id: '8tu4bsun805n8un48ve89',
          parentId: '8xf0y6ziyjabvozdd253nd',
          timestamp: 1469479767190,
          body: 'Comments. Are. Cool.',
          author: 'thingone',
          voteScore: -5,
          deleted: false,
          parentDeleted: false
        }
      },
      {
        type: types.EDIT_COMMENT,
        idEditComment: '8tu4bsun805n8un48ve89',
        timestampEditComment: 1517508761153,
        bodyEditComment: 'This is a great test!'
      }
    )).toEqual({
      '8tu4bsun805n8un48ve89': {
        id: '8tu4bsun805n8un48ve89',
        parentId: '8xf0y6ziyjabvozdd253nd',
        timestamp: 1517508761153,
        body: 'This is a great test!',
        author: 'thingone',
        voteScore: -5,
        deleted: false,
        parentDeleted: false
      }
    })
  })
  it ('should handle UPDOWNVOTE', () => {
    expect (comments (
      {
        '8tu4bsun805n8un48ve89': {
          id: '8tu4bsun805n8un48ve89',
          parentId: '8xf0y6ziyjabvozdd253nd',
          timestamp: 1517508761153,
          body: 'This is a great test!',
          author: 'thingone',
          voteScore: -5,
          deleted: false,
          parentDeleted: false
        }
      },
      {
        type: types.UPDOWNVOTE,
        idCommentVote: '8tu4bsun805n8un48ve89',
        numberVoteScore: -4
      }
    )).toEqual ({
      '8tu4bsun805n8un48ve89': {
        id: '8tu4bsun805n8un48ve89',
        parentId: '8xf0y6ziyjabvozdd253nd',
        timestamp: 1517508761153,
        body: 'This is a great test!',
        author: 'thingone',
        voteScore: -4,
        deleted: false,
        parentDeleted: false
      }
    })
  })
  it ('should handle REMOVE_COMMENT', () => {
    expect (comments (
      {
        '8tu4bsun805n8un48ve89': {
          id: '8tu4bsun805n8un48ve89',
          parentId: '8xf0y6ziyjabvozdd253nd',
          timestamp: 1517508761153,
          body: 'This is a great test!',
          author: 'thingone',
          voteScore: -4,
          deleted: false,
          parentDeleted: false
        }
      },
      {
        type: types.REMOVE_COMMENT,
        idComment: '8tu4bsun805n8un48ve89'
      }
    )).toEqual ({})
  })
})