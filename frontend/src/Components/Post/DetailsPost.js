import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ReactModal from 'react-modal'
import Menu from '../Post/Menu'
import FaBars from 'react-icons/lib/fa/bars'
import FaClose from 'react-icons/lib/fa/close'
import { 
  fetchPostById,
  fetchRemovePost,
  updateNumberComment,
  fetchUpDownVotePost } from '../../Actions/postAction'
import { 
  fetchComments,
  fetchAddComment,
  fetchRemoveComment,
  fetchEditComment,
  fetchUpDownVoteComment } from '../../Actions/commentAction'
import CreateComment from '../../Components/Comment/CreateComment'
import Post from './Post'
import Comment from '../Comment/Comment'

class DetailsPost extends Component {
  /**
   * @description Represent DetailsPost
   */
  constructor(){
    super()
    this.state = {
      newComment: false,
      editComment: false,
      idComment: null,
      menu: true
    }
  }
  /**
   * @description Allow show the form comment and close it
   */
  openAddComment = () => {
    this.state.editComment && this.setState(() => ({ editComment: false }))
    this.setState(() => ({ newComment: true }))
  }
  closeComment = () => this.setState(() => ({ newComment: false, editComment: false }))
  /**
   * @description Add new comment and update the comment number
   * @param {Object} comment
   */
  onAddComment = (comment) => {
    this.props.addComment(comment)
    this.props.updateNumberComment(this.props.match.params.post_id,'increase')
  }
  /**
   * @description Delete any comment and update the comment number
   * @param {Object} comment
   */
  onRemoveComment = (comment) => {
    this.props.removeComment(comment)
    this.props.updateNumberComment(this.props.match.params.post_id,'decrease')
  }
  /**
   * @description Allow show the form EditComment
   * @param {string} idComment Comment identifier
   */
  openEditComment = (idComment) => {
    this.state.newComment && this.setState(() => ({ newComment: false }))
    this.setState(() => ({ editComment: true, idComment }))
  }
  /**
   * @description Remove the post
   * @param {Object} post
   */
  onRemovePost = (post) => {
    this.props.removePost(post)
    this.props.history.push('/')
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
   * @description Invoke immidiately after the component is inserted in the DOM
   */
  componentDidMount () {
    const id = this.props.match.params.post_id    
    this.props.getPostById(id)
    this.props.getComments(id)
  }
  render () {    
    const {post, comments, onEditComment, votePost, voteComment}=this.props    
    const {newComment, editComment, idComment}=this.state    
    return (
      <div className="container">
        <Link className="close-create-post" 
        to={{
          pathname: "/"
        }}
        >Back</Link>
        {typeof post === 'object' &&
          <Post
            post={post}
            onVote={votePost}
            onRemovePost={this.onRemovePost}
            typeVote={"postDetails"}
          />
        }
        <div className="row">
          <div className="col-md-12">
            <ul className="rd-comment-list">
              {comments.map((comment, index) => (
                <Comment 
                  key={index}
                  comment={comment}                  
                  onRemoveComment={this.onRemoveComment}
                  voteComment={voteComment}
                  openEditComment={this.openEditComment}
                  editComment={editComment}                  
                  idComment={idComment}
                  onEditComment={onEditComment}
                  onCloseForm={this.closeComment}
                />    
              ))} 
            </ul>
          </div>             
        </div>
        <div className="add-post" onClick={this.onMenu}>
          <div>
            {this.state.menu
              ? <FaBars className="icon-menu" size={20}/>
              : <FaClose className="icon-menu" size={20}/>
            }           
          </div>
        </div>
        <div hidden={this.state.menu} className="menu-post" onClick={this.onMenu}>
          <Menu
            openAddComment={this.openAddComment}
          />
        </div>                 
          <div>
            <ReactModal
              isOpen={newComment}
              onRequestClose={this.closeComment}
              style={{ 
                overlay: {},
                content: {left: 350, right: 350, top: 150, bottom: 150} 
              }}
            >
            {newComment && (
              <CreateComment 
                onCloseForm={this.closeComment}
                onAddComment={this.onAddComment}
                idPost={this.props.match.params.post_id}
                edit={false}
              />
            )}   
            </ReactModal>            
          </div>      
      </div>
    )
  }
}
/**
 * @description Specify which data from the store you passed to your React component
 * @param {Object} comments
 * @param {Object} posts
 * @return {Object}
 */
function mapStateToProps ({comments, posts}) {  
  return {
    post: posts.postDetails,
    comments: Object.keys(comments).map(key => comments[key])
  }
}
/**
 * @description Bind dispatch to your action creators before they ever hit your component
 * @param {function} dispatch
 * @return {Object}
 */
function mapDispatchToProps (dispatch) {
  return {
    getPostById: (idPost) => dispatch(fetchPostById(idPost)),
    removePost: (data) => dispatch(fetchRemovePost(data)),
    getComments: (idPost) => dispatch(fetchComments(idPost)),
    addComment: (data) => dispatch(fetchAddComment(data)),
    removeComment: (data) => dispatch(fetchRemoveComment(data)),
    updateNumberComment: (idPost, typeUpdate) => dispatch(updateNumberComment(idPost, typeUpdate)),
    onEditComment: (comment) => dispatch(fetchEditComment(comment)),
    votePost: (idPost, option, typeVote) => dispatch(fetchUpDownVotePost(idPost, option, typeVote)),
    voteComment: (idComment, option) => dispatch(fetchUpDownVoteComment(idComment, option))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailsPost)