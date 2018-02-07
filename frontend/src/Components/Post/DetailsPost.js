import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Modal from 'react-modal'
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
  fetchUpDownVoteComment} from '../../Actions/commentAction'
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
   * @description Validate the props declared
   */
  static propTypes = {
    post: PropTypes.object.isRequired,
    comments: PropTypes.array.isRequired,
    getPostById: PropTypes.func.isRequired,
    getComments: PropTypes.func.isRequired,
    removeComment: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired,
    voteComment: PropTypes.func.isRequired,
    votePost: PropTypes.func.isRequired,
    updateNumberComment: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired
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
   * @description Remove the post and all comments
   * @param {Object} post
   */
  onRemovePost = (post) => {   
    this.props.comments.forEach(comment => {
      this.props.removeComment(comment)
    })
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
  /**
   * @description Invoke whenever the component is about to receive brand new props.
   * @param {object} nextProps 
   */
  componentWillReceiveProps (nextProps) {     
    typeof nextProps.post.error !== 'undefined' && this.props.history.push('/') 
    Object.keys(nextProps.post).length === 0 && this.props.history.push('/')
  }
  render () {    
    const {post, comments, votePost, voteComment}=this.props    
    const {newComment, editComment, idComment}=this.state
    return (
      <div className="container">
        <Link className="rd-close-create-post" 
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
            <Modal
              isOpen={newComment}
              onRequestClose={this.closeComment}
              style={customStyles}
              ariaHideApp={false}
            >
            {newComment && (
              <CreateComment 
                onCloseForm={this.closeComment}
                onAddComment={this.onAddComment}
                idPost={this.props.match.params.post_id}
                edit={false}
              />
            )}   
            </Modal>            
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
    removePost: (post) => dispatch(fetchRemovePost(post)),
    getComments: (idPost) => dispatch(fetchComments(idPost)),
    addComment: (data) => dispatch(fetchAddComment(data)),
    removeComment: (comment) => dispatch(fetchRemoveComment(comment)),
    updateNumberComment: (idPost, typeUpdate) => dispatch(updateNumberComment(idPost, typeUpdate)),
    votePost: (idPost, option, typeVote) => dispatch(fetchUpDownVotePost(idPost, option, typeVote)),
    voteComment: (idComment, option) => dispatch(fetchUpDownVoteComment(idComment, option))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailsPost)

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}