import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchPostById, fetchRemovePost, updateNumberComment } from '../Actions/postAction'
import { fetchComments, fetchAddComment, fetchRemoveComment, fetchEditComment } from '../Actions/commentAction'
import FaCommentO from 'react-icons/lib/fa/comment-o'
import CreateComment from '../Components/Comment/CreateComment'

class DetailsPost extends Component {
  /**
   * @description Represent DetailsPost
   */
  constructor(){
    super()
    this.state = {
      newComment: false,
      editComment: false,
      idComment: null
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
    this.props.updateNumberComment(this.props.match.params.id,'increase')
  }
  /**
   * @description Delete any comment and update the comment number
   * @param {Object} comment
   */
  onRemoveComment = (comment) => {
    this.props.removeComment(comment)
    this.props.updateNumberComment(this.props.match.params.id,'decrease')
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
   * @description Invoke immidiately after the component is inserted in the DOM
   */
  componentDidMount () {
    const id = this.props.match.params.id
    this.props.getPostById(id)
    this.props.getComments(id)
  }
  render () {
    const {post, removePost, comments, onEditComment}=this.props
    const {newComment, editComment, idComment}=this.state
    return (
      <div>        
        <div className="post" >
          <div className="post-pointer" onClick={this.handleClick}>
            <p><strong>Title:</strong> {post.title}</p>
            <p><strong>Title:</strong> {post.body}</p>
            <p><strong>Author:</strong> {post.author}</p>
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
        <div>
          <div>
            {comments.comments.map((comment, index) => (
              <div key={index} className="post">
                <p><strong>Body:</strong> {comment.body}</p>
                <p><strong>Author:</strong> {comment.author}</p>
                {editComment && comment.id === idComment && (
                  <CreateComment 
                    edit={true}
                    objComment={comment}
                    onEditComment={onEditComment}
                    onCloseForm={this.closeComment}
                  />
                )}
                <div>
                  <a className="button-post-delete list-element-post post-pointer" onClick={() => this.onRemoveComment(comment)}>Delete</a>         
                  <a className="button-post-delete list-element-post post-pointer" onClick={() => this.openEditComment(comment.id)}>Edit</a>
                </div> 
              </div>              
            ))}             
          </div>         
          <div>
            <a className="button-post-delete list-element-post post-pointer" onClick={this.openAddComment}>New comment</a>
            {newComment && (
              <CreateComment 
                onCloseForm={this.closeComment}
                onAddComment={this.onAddComment}
                idPost={this.props.match.params.id}
                edit={false}
              />
            )}       
          </div>
        </div>  
      </div>
    )
  }
}
function mapStateToProps (state) {
  return {
    post: state.posts.post,
    comments: state.comments
  }
}
function mapDispatchToProps (dispatch) {
  return {
    getPostById: (idPost) => dispatch(fetchPostById(idPost)),
    removePost: (data) => dispatch(fetchRemovePost(data)),
    getComments: (idPost) => dispatch(fetchComments(idPost)),
    addComment: (data) => dispatch(fetchAddComment(data)),
    removeComment: (data) => dispatch(fetchRemoveComment(data)),
    updateNumberComment: (idPost, typeUpdate) => dispatch(updateNumberComment(idPost, typeUpdate)),
    onEditComment: (comment) => dispatch(fetchEditComment(comment))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailsPost)