import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchPosts, fetchRemovePost } from '../Actions/postAction'
import FaCommentO from 'react-icons/lib/fa/comment-o'
import { Link } from 'react-router-dom'

class ListPosts extends Component {
  /**
   * @description Validate of the data types passed to the component
   */
  static propTypes = {
    posts: PropTypes.object.isRequired
  }
  /**
   * @description Invoke immediately after the component is inserted in the DOM
   */
  componentDidMount () {
    this.props.posts.posts.length === 0 && this.props.getPosts()
  } 
  render(){
    const {posts, removePost}=this.props    
    return(
      <div>
        <h2 className="list-category-post">Posts</h2>        
        {posts.posts.map((post, index) => (          
          <div key={index} className="post" >
            <div className="post-pointer">
              <p><strong>Title:</strong> {post.title}</p>
              <p><strong>Author:</strong> {post.author}</p>
              <Link to={{
                pathname: `/${post.category}/${post.id}`
              }}>
                Details
              </Link>
            </div>            
            <div className="list-separator-post">
              <a className="button-post-delete list-element-post post-pointer" onClick={() => removePost(post)}>Delete</a>
              
              <Link to={{
                pathname: `/posts/${post.id}`
              }}>
                Edit
              </Link>
              
              <a className="list-element-post"><FaCommentO size={20}/>{post.commentCount}</a>
            </div>  
          </div>       
        ))}
        <div>
              <Link to="/createPost">
                Add
              </Link>
            </div>          
      </div>
    )
  }
}
/**
 * @description Specify which data from the store you want passed to your React component
 * @param {Object} state - The current store state
 * @return {Object}
 */
function mapStateToProps (state) {
  return {
    posts: state.posts
  }
}
/**
 * @description Bind dispatch to your action creators before they ever hit your component
 * @param {function} dispatch - Our specific props
 * @return {Object}
 */
function mapDispatchToProps (dispatch) {
  return {
    getPosts: () => dispatch(fetchPosts(dispatch)),
    removePost: (data) => dispatch(fetchRemovePost(data)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListPosts)