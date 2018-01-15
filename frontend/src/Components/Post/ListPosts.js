import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchPosts, fetchRemovePost, fetchUpDownVotePost } from '../../Actions/postAction'
import { Link } from 'react-router-dom'
import Post from './Post'

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
    const {posts, removePost, votePost}=this.props    
    return(
      <div>
        <h2 className="list-category-post">Posts</h2>        
        {posts.posts.map((post, index) => (          
          <Post key={index} post={post} onVote={votePost} removePost={removePost}/>     
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
    votePost: (idPost, option) => dispatch(fetchUpDownVotePost(idPost, option))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListPosts)