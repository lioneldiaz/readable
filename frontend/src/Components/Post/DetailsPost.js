import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
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
      <div>
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
        <div>
          <div>
            <ul>
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
                ))
              } 
            </ul>             
          </div>         
          <div>
            <a className="button-post-delete list-element-post post-pointer" onClick={this.openAddComment}>New comment</a>
            {newComment && (
              <CreateComment 
                onCloseForm={this.closeComment}
                onAddComment={this.onAddComment}
                idPost={this.props.match.params.post_id}
                edit={false}
              />
            )}       
          </div>
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