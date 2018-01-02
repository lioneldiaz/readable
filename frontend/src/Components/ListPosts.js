import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchPosts } from '../Actions/postAction'

class ListPosts extends Component {
  /**
   * @description Validate the props declared
   */
  static propTypes = {
    posts: PropTypes.object.isRequired
  }
  /**
   * @description Invoke immediately after the component is inserted in the DOM
   */
  componentDidMount () {
    this.props.getPosts()
  }
  render(){
    const { posts } = this.props
    return(
      <div>
        <ul>
          {posts.posts.map((post, index) => (
            <li key={index}>
              {post.title}
            </li>
          ))}
        </ul>
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
    getPosts: () => dispatch(fetchPosts(dispatch))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListPosts)