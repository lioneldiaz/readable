import React, {Component} from 'react'
import { connect } from 'react-redux'
import { 
  fetchPostByCategory,
  fetchUpDownVotePost,
  fetchRemovePost} from '../../Actions/postAction'
import Post from '../Post/Post'

class CategoryByPosts extends Component {
  /**
   * @description Remove the post
   * @param {Object} post - Post that will be remove
   * @param {string} typeRemove - Discribes whether is removed of the list post or category by post
   */
  onRemovePost = (post, typeRemove) => {
    this.props.removePost(post, typeRemove)
    this.props.posts.length === 1 && this.props.history.push('/')
  }
  /**
   * @description Invoke immediately after the component is inserted in the DOM 
   */
  componentDidMount () {
    this.props.getPostsByCategory(this.props.match.params.category)
  }
  render () {
    const {posts, votePost}=this.props
    return (
      <div>
        <h1>{this.props.match.params.category}</h1>
        {posts.map((post, index) => (
          <Post 
            key={index} 
            post={post} 
            onVote={votePost} 
            onRemovePost={this.onRemovePost} 
            typeVote={"postCategory"}
            typeRemove={"postCategory"}
          />
        ))}
      </div>
    )
  }
}
/**
 * @description Specify which data from store you passed to your React component
 * @param {Object} posts
 * @return {Object}
 */
function mapStateToProps ({posts}) {
  return {
    posts: Object.keys(posts.postDetails).map(key => posts.postDetails[key])
  }
}
/**
 * @description Bind dispatch to your action creators before they ever hit your component
 * @param {function} dispatch
 * @return {Object}
 */
function mapDispatchToProps (dispatch) {
  return {
    getPostsByCategory: (category) => dispatch(fetchPostByCategory(category)),
    removePost: (post, typeRemove) => dispatch(fetchRemovePost(post, typeRemove)),
    votePost: (idPost, option, typeVote) => dispatch(fetchUpDownVotePost(idPost, option, typeVote))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoryByPosts)