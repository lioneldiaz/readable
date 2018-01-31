import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { 
  fetchPosts, 
  fetchRemovePost, 
  fetchUpDownVotePost,
  goSortDate } from '../../Actions/postAction'
import FaBars from 'react-icons/lib/fa/bars'
import FaClose from 'react-icons/lib/fa/close'
import Menu from './Menu'
import Post from './Post'

class ListPosts extends Component {
  /**
   * @description Represent ListPosts
   */
  constructor () {
    super();
    this.state = {
      menu: true
    }
  }
  /**
   * @description Show up menu or hide
   */
  onMenu = () => {
    this.state.menu  
    ? this.setState(() => ({menu: false}))
    : this.setState(() => ({menu: true}))
  }
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
      <div className="container">        
        <div className="rd-separator"/>
        <div className="row">      
        {posts.map((post, index) => (
          <div key={index} className="col-md-6">
            <Post key={index} post={post} onVote={votePost} onRemovePost={removePost} typeVote={"postList"}/>
          </div>
        ))}
        </div>
        <div className="add-post" onClick={this.onMenu}>
          <div>
            {this.state.menu
              ? <FaBars className="icon-menu" size={20}/>
              : <FaClose className="icon-menu" size={20}/>
            }           
          </div>
        </div>
        <div hidden={this.state.menu} className="menu-post">
          <Menu
            sortPost={sortPost}
            posts={posts}
            typeMenu={"postMenu"}
          />
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