import { posts } from './postReducer'
import * as types from '../Constans/ActionTypesComment'

describe ('posts reducer', () => {
  it ('should return initial state', () => {
    expect (posts ({
      posts: {},
      postDetails: {}
    }, {})).toEqual ({
      posts: {},
      postDetails: {}
    })
  })
  it ('should handle GET_POSTS', () => {
    expect (
      posts (
        {
          posts:{},
          postDetails:{}
        }, 
        {
          type: types.GET_POSTS,
          posts: {
            '8xf0y6ziyjabvozdd253nd':{
              id:'8xf0y6ziyjabvozdd253nd',
              timestamp:1467166872634,
              title:'Udacity is the best place to learn React',
              body:'Everyone says so after all.',
              author:'thingtwo',
              category:'react',
              voteScore:6,
              deleted:false,
              commentCount:2}
            }
        }
    )).toEqual ({
      posts: {
        '8xf0y6ziyjabvozdd253nd':{
          id:'8xf0y6ziyjabvozdd253nd',
          timestamp:1467166872634,
          title:'Udacity is the best place to learn React',
          body:'Everyone says so after all.',
          author:'thingtwo',
          category:'react',
          voteScore:6,
          deleted:false,
          commentCount:2}
        },
        postDetails: {}}
    )
  })
  it ('should handle DETAILS_POSTS', () => {
    expect (posts (
      {
        posts: {
          '8xf0y6ziyjabvozdd253nd':{
            id:'8xf0y6ziyjabvozdd253nd',
            timestamp:1467166872634,
            title:'Udacity is the best place to learn React',
            body:'Everyone says so after all.',
            author:'thingtwo',
            category:'react',
            voteScore:6,
            deleted:false,
            commentCount:2}
        },
        postDetails: {}
      },
      {
        type: types.DETAIL_POST,
        postId: {
          '8xf0y6ziyjabvozdd253nd':{
            id:'8xf0y6ziyjabvozdd253nd',
            timestamp:1467166872634,
            title:'Udacity is the best place to learn React',
            body:'Everyone says so after all.',
            author:'thingtwo',
            category:'react',
            voteScore:6,
            deleted:false,
            commentCount:2}
        }
      }
    )).toEqual ({
      posts: {
        '8xf0y6ziyjabvozdd253nd':{
          id:'8xf0y6ziyjabvozdd253nd',
          timestamp:1467166872634,
          title:'Udacity is the best place to learn React',
          body:'Everyone says so after all.',
          author:'thingtwo',
          category:'react',
          voteScore:6,
          deleted:false,
          commentCount:2}
      },
      postDetails: {
        '8xf0y6ziyjabvozdd253nd':{
          id:'8xf0y6ziyjabvozdd253nd',
          timestamp:1467166872634,
          title:'Udacity is the best place to learn React',
          body:'Everyone says so after all.',
          author:'thingtwo',
          category:'react',
          voteScore:6,
          deleted:false,
          commentCount:2}
      }
    })
  })
  it ('should handle REMOVE_POST', () => {
    expect (posts (
      {
        posts: {
          '8xf0y6ziyjabvozdd253nd': {
            id:'8xf0y6ziyjabvozdd253nd',
            timestamp:1467166872634,
            title:'Udacity is the best place to learn React',
            body:'Everyone says so after all.',
            author:'thingtwo',
            category:'react',
            voteScore:6,
            deleted:false,
            commentCount:2},
          '6ni6ok3ym7mf1p33lnez': {
            id:'6ni6ok3ym7mf1p33lnez',
            timestamp:1468479767190,
            title:'Learn Redux in 10 minutes!',
            body:'Just kidding. It takes more than 10 minutes to learn technology.',
            author:'thingone',
            category:'redux',
            voteScore:-5,
            deleted:false,
            commentCount:0}
        },
        postDetails: {}
      },
      {
        type: types.REMOVE_POST,
        idPost: '6ni6ok3ym7mf1p33lnez',
        typeRemove: undefined
      }
    )).toEqual ({
      posts: {
        '8xf0y6ziyjabvozdd253nd': {
          id:'8xf0y6ziyjabvozdd253nd',
          timestamp:1467166872634,
          title:'Udacity is the best place to learn React',
          body:'Everyone says so after all.',
          author:'thingtwo',
          category:'react',
          voteScore:6,
          deleted:false,
          commentCount:2}
      },
      postDetails: {}
    })
  })
  it ('should handle ADD_POST', () => {
    expect (posts (
      {
        posts: {},
        postDetails: {}
      },
      {
        type: types.ADD_POST,
        newPost: {
            id:'8xf0y6ziyjabvozdd253nd',
            timestamp:1467166872634,
            title:'Udacity is the best place to learn React',
            body:'Everyone says so after all.',
            author:'thingtwo',
            category:'react',
            voteScore:6,
            deleted:false,
            commentCount:2
        }
      }
    )).toEqual ({
      posts: {
        '8xf0y6ziyjabvozdd253nd': {
          id:'8xf0y6ziyjabvozdd253nd',
          timestamp:1467166872634,
          title:'Udacity is the best place to learn React',
          body:'Everyone says so after all.',
          author:'thingtwo',
          category:'react',
          voteScore:6,
          deleted:false,
          commentCount:2}
      },
      postDetails: {}
    })
  })

  it ('should handle EDIT_POST', () => {
    expect (posts (
      {
        posts: {
          '8xf0y6ziyjabvozdd253nd': {
            id:'8xf0y6ziyjabvozdd253nd',
            timestamp:1467166872634,
            title:'Udacity is the best place to learn React',
            body:'Everyone says so after all.',
            author:'thingtwo',
            category:'react',
            voteScore:6,
            deleted:false,
            commentCount:2}
        },
        postDetails: {}
      },
      {
        type: types.EDIT_POST,
        id: '8xf0y6ziyjabvozdd253nd',
        title: 'Edit any post.',
        body: 'Hello, I am here!'
      }
    )).toEqual ({
      posts: {
        '8xf0y6ziyjabvozdd253nd': {
          id:'8xf0y6ziyjabvozdd253nd',
          timestamp:1467166872634,
          title:'Edit any post.',
          body:'Hello, I am here!',
          author:'thingtwo',
          category:'react',
          voteScore:6,
          deleted:false,
          commentCount:2}
      },
      postDetails: {
          title:'Edit any post.',
          body:'Hello, I am here!'
      }
    })
  })

  it ('should handle UP_ DOWN_VOTE_POST', () => {
    expect (posts (
      {
        posts: {},
        postDetails: {
            id:'8xf0y6ziyjabvozdd253nd',
            timestamp:1467166872634,
            title:'Udacity is the best place to learn React',
            body:'Everyone says so after all.',
            author:'thingtwo',
            category:'react',
            voteScore:6,
            deleted:false,
            commentCount:2
          }
      },
      {
        type: types.UP_DOWN_VOTE_POST,
        numberVote: 6,
        idPostVote: '8xf0y6ziyjabvozdd253nd',
        typeVote: 'postDetails'
      }
    )).toEqual({
      posts: {},
      postDetails: {
          id:'8xf0y6ziyjabvozdd253nd',
          timestamp:1467166872634,
          title:'Udacity is the best place to learn React',
          body:'Everyone says so after all.',
          author:'thingtwo',
          category:'react',
          voteScore:6,
          deleted:false,
          commentCount:2
      }
    })
  })

  it ('should handle UPDATE_NUMBER_COMMENT', () => {
    expect (posts (
      {
        posts: {
          '8xf0y6ziyjabvozdd253nd': {
            id:'8xf0y6ziyjabvozdd253nd',
            timestamp:1467166872634,
            title:'Udacity is the best place to learn React',
            body:'Everyone says so after all.',
            author:'thingtwo',
            category:'react',
            voteScore:6,
            deleted:false,
            commentCount:3}
        },
        postDetails: {
          id:'8xf0y6ziyjabvozdd253nd',
          timestamp:1467166872634,
          title:'Udacity is the best place to learn React',
          body:'Everyone says so after all.',
          author:'thingtwo',
          category:'react',
          voteScore:6,
          deleted:false,
          commentCount:3
        }
      },
      {
        type: types.UPDATE_NUMBER_COMMENT,
        idPostComment: '8xf0y6ziyjabvozdd253nd',
        typeUpdate: 'increase'
      }
    )).toEqual ({
      posts: {
        '8xf0y6ziyjabvozdd253nd': {
          id:'8xf0y6ziyjabvozdd253nd',
          timestamp:1467166872634,
          title:'Udacity is the best place to learn React',
          body:'Everyone says so after all.',
          author:'thingtwo',
          category:'react',
          voteScore:6,
          deleted:false,
          commentCount:4}
      },
      postDetails: {
        id:'8xf0y6ziyjabvozdd253nd',
        timestamp:1467166872634,
        title:'Udacity is the best place to learn React',
        body:'Everyone says so after all.',
        author:'thingtwo',
        category:'react',
        voteScore:6,
        deleted:false,
        commentCount:4
      }
    })
  })

  it ('should handle SORT', () => {
    expect (posts (
      {
        posts: {
          '8xf0y6ziyjabvozdd253nd': {
            id: '8xf0y6ziyjabvozdd253nd',
            timestamp: 1467166872634,
            title: 'Udacity is the best place to learn React',
            body: 'Everyone says so after all.',
            author: 'thingtwo',
            category: 'react',
            voteScore: 6,
            deleted: false,
            commentCount: 3
          },
          '6ni6ok3ym7mf1p33lnez': {
            id: '6ni6ok3ym7mf1p33lnez',
            timestamp: 1468479767190,
            title: 'Learn Redux in 10 minutes!',
            body: 'Just kidding. It takes more than 10 minutes to learn technology.',
            author: 'thingone',
            category: 'redux',
            voteScore: -5,
            deleted: false,
            commentCount: 0
          }
        },
        postDetails: {}
      },
      {
        type: types.SORT,
        sortPosts: {
          '6ni6ok3ym7mf1p33lnez': {
            id: '6ni6ok3ym7mf1p33lnez',
            timestamp: 1468479767190,
            title: 'Learn Redux in 10 minutes!',
            body: 'Just kidding. It takes more than 10 minutes to learn technology.',
            author: 'thingone',
            category: 'redux',
            voteScore: -5,
            deleted: false,
            commentCount: 0
          },
          '8xf0y6ziyjabvozdd253nd': {
            id: '8xf0y6ziyjabvozdd253nd',
            timestamp: 1467166872634,
            title: 'Udacity is the best place to learn React',
            body: 'Everyone says so after all.',
            author: 'thingtwo',
            category: 'react',
            voteScore: 6,
            deleted: false,
            commentCount: 3
          }
        }
      }
    )).toEqual ({
      posts: {
        '6ni6ok3ym7mf1p33lnez': {
          id: '6ni6ok3ym7mf1p33lnez',
          timestamp: 1468479767190,
          title: 'Learn Redux in 10 minutes!',
          body: 'Just kidding. It takes more than 10 minutes to learn technology.',
          author: 'thingone',
          category: 'redux',
          voteScore: -5,
          deleted: false,
          commentCount: 0
        },
        '8xf0y6ziyjabvozdd253nd': {
          id: '8xf0y6ziyjabvozdd253nd',
          timestamp: 1467166872634,
          title: 'Udacity is the best place to learn React',
          body: 'Everyone says so after all.',
          author: 'thingtwo',
          category: 'react',
          voteScore: 6,
          deleted: false,
          commentCount: 3
        }
      },
      postDetails: {}
    })
  })

  it ('should handle GET_POST_BY_CATEGORY', () => {
    expect(posts (
      {
        posts: {
          '6ni6ok3ym7mf1p33lnez': {
            id: '6ni6ok3ym7mf1p33lnez',
            timestamp: 1468479767190,
            title: 'Learn Redux in 10 minutes!',
            body: 'Just kidding. It takes more than 10 minutes to learn technology.',
            author: 'thingone',
            category: 'redux',
            voteScore: -5,
            deleted: false,
            commentCount: 0
          },
          '8xf0y6ziyjabvozdd253nd': {
            id: '8xf0y6ziyjabvozdd253nd',
            timestamp: 1467166872634,
            title: 'Udacity is the best place to learn React',
            body: 'Everyone says so after all.',
            author: 'thingtwo',
            category: 'react',
            voteScore: 6,
            deleted: false,
            commentCount: 3
          }
        },
        postDetails: {
          '8xf0y6ziyjabvozdd253nd': {
            id: '8xf0y6ziyjabvozdd253nd',
            timestamp: 1467166872634,
            title: 'Udacity is the best place to learn React',
            body: 'Everyone says so after all.',
            author: 'thingtwo',
            category: 'react',
            voteScore: 6,
            deleted: false,
            commentCount: 3
          }
        }
      },
      {
        type: types.GET_POST_BY_CATEGORY,
        postsByCategory: {
          '8xf0y6ziyjabvozdd253nd': {
            id: '8xf0y6ziyjabvozdd253nd',
            timestamp: 1467166872634,
            title: 'Udacity is the best place to learn React',
            body: 'Everyone says so after all.',
            author: 'thingtwo',
            category: 'react',
            voteScore: 6,
            deleted: false,
            commentCount: 3
          }
        }
      }
    )).toEqual({
      posts: {
        '6ni6ok3ym7mf1p33lnez': {
          id: '6ni6ok3ym7mf1p33lnez',
          timestamp: 1468479767190,
          title: 'Learn Redux in 10 minutes!',
          body: 'Just kidding. It takes more than 10 minutes to learn technology.',
          author: 'thingone',
          category: 'redux',
          voteScore: -5,
          deleted: false,
          commentCount: 0
        },
        '8xf0y6ziyjabvozdd253nd': {
          id: '8xf0y6ziyjabvozdd253nd',
          timestamp: 1467166872634,
          title: 'Udacity is the best place to learn React',
          body: 'Everyone says so after all.',
          author: 'thingtwo',
          category: 'react',
          voteScore: 6,
          deleted: false,
          commentCount: 3
        }
      },
      postDetails: {
        '8xf0y6ziyjabvozdd253nd': {
          id: '8xf0y6ziyjabvozdd253nd',
          timestamp: 1467166872634,
          title: 'Udacity is the best place to learn React',
          body: 'Everyone says so after all.',
          author: 'thingtwo',
          category: 'react',
          voteScore: 6,
          deleted: false,
          commentCount: 3
        }
      }
    })
  })
})
