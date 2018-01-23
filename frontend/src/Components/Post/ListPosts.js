import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { 
  fetchPosts, 
  fetchRemovePost, 
  fetchUpDownVotePost,
  goSortDate } from '../../Actions/postAction'
import { Link } from 'react-router-dom'
import Post from './Post'

class ListPosts extends Component {
  /**
   * @description Validate of the data types passed to the component
   */
  static propTypes = {
    posts: PropTypes.array.isRequired
  }
  /**
   * @description Invoke immediately after the component is inserted in the DOM
   */
  componentDidMount () {
    this.props.posts.length === 0 && this.props.getPosts()
  } 
  render(){
    const {posts, removePost, votePost, sortPost}=this.props    
    return(
      <div>
        <a onClick={() => sortPost(posts,"ASC","timestamp")}>Sort Date ASC</a>
        <a onClick={() => sortPost(posts,"DESC","timestamp")}>Sort Date DESC</a>
        <a onClick={() => sortPost(posts,"ASC","voteScore")}>Sort Vote Score ASC</a>
        <a onClick={() => sortPost(posts,"DESC","voteScore")}>Sort Vote Score DESC</a>
        <h2 className="list-category-post">Posts</h2>       
        {posts.map((post, index) => (                
          <Post key={index} post={post} onVote={votePost} onRemovePost={removePost} typeVote={"postList"}/>     
        ))}
        <div>
          <Link to="/new/post">
            Add
          </Link>
        </div>          
      </div>
    )
  }
}
/**
 * @description Specify which data from the store you want passed to your React component
 * @param {Object} posts
 * @return {Object}
 */
function mapStateToProps ({posts}) {
  return {
    posts: Object.keys(posts.posts).map(key => posts.posts[key])
  }
}
/**
 * @description Bind dispatch to your action creators before they ever hit your component
 * @param {function} dispatch
 * @return {Object}
 */
function mapDispatchToProps (dispatch) {
  return {
    getPosts: () => dispatch(fetchPosts(dispatch)),
    removePost: (data) => dispatch(fetchRemovePost(data)),
    votePost: (idPost, option, typeVote) => dispatch(fetchUpDownVotePost(idPost, option, typeVote)),
    sortPost: (posts, typeSort, propertySort) => dispatch(goSortDate(posts, typeSort, propertySort))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListPosts)