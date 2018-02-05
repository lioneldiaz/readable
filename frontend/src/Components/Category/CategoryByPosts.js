import React, {Component} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { 
  fetchPostByCategory,
  fetchUpDownVotePost,
  fetchRemovePost} from '../../Actions/postAction'
import { Link } from 'react-router-dom'
import Post from '../Post/Post'
import * as typesCategory from '../../Constans/TextCategories'
import './Category.css'

class CategoryByPosts extends Component {
  /**
   * @description Validate the props declared
   */
  static propTypes = {
    posts: PropTypes.array.isRequired,
    getPostsByCategory: PropTypes.func.isRequired,
    votePost: PropTypes.func.isRequired,
    removePost: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired
  }
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
    const {category}=this.props.match.params
    const styleBackground = {background: category==='react'?'#61DAFB':category==='redux'?'#7747BC':'#02B3E4'}
    const styleColor = {color: category==='react'?'#61DAFB':category==='redux'?'#7747BC':'#02B3E4'}
    return (
      <div>
        <div className="row">
          <div className="col-md-12">           
            <Link className="rd-close-create-post" to="/"/>                              
            <div className="rd-category-by-post" style={styleBackground}/>
            <div className="rd-category-by-post-body">
              <h1 style={styleColor}>{category}</h1>
              <p className="card-text">
                {category === 'react' && typesCategory.reactCategory}
                {category === 'udacity' && typesCategory.udacityCategory}
                {category === 'redux' && typesCategory.reduxCategory}
              </p>          
            </div>            
          </div>        
        </div>
        <div className="rd-separator"/>     
        <div className="row">          
          {posts.map((post, index) => (
            <div key={index} className="col-md-12">
              <Post 
                key={index} 
                post={post} 
                onVote={votePost} 
                onRemovePost={this.onRemovePost} 
                typeVote={"postCategory"}
                typeRemove={"postCategory"}
              />
            </div>
          ))}
        </div>        
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