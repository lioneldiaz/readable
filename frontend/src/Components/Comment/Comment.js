import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FaUser from 'react-icons/lib/fa/user'
import CreateComment from './CreateComment'
import FaTrashO from 'react-icons/lib/fa/trash-o'
import FaEdit from 'react-icons/lib/fa/edit'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'
import { convertDate } from '../../Util/helpers'
import Modal from 'react-modal'
import './Comment.css'

class Comment extends Component {
  /**
   * @description Represent Comment
   */
  constructor () {
    super();
    this.state = {
      menuVote: true
    }
  }
  /**
   * @description Validate the props declared
   */
  static propTypes = {
    comment: PropTypes.object.isRequired,
    editComment: PropTypes.bool.isRequired,
    voteComment: PropTypes.func.isRequired,
    openEditComment: PropTypes.func.isRequired,
    onRemoveComment: PropTypes.func.isRequired,
    idComment: PropTypes.string,
    onCloseForm: PropTypes.func.isRequired
  }
  render () {
    const {comment, editComment, voteComment, openEditComment, onRemoveComment, idComment, 
      onCloseForm}=this.props
    return (  
    <li> 
      <div className="row">
        <div className="col-md-1">
          <FaUser className="rd-post-icon-author rd-comment-icon-author" size={40}/>
        </div>
        <div className="col-md-11">
          <div className="rd-comment-body">          
            <p><strong>{comment.author}</strong> {comment.body}</p>
          </div>
        </div>        
      </div>
      <div className="row text-center">
        <div className="col-md-1 offset-4">
          <a className="rd-list-element-post rd-post-pointer" onClick={() => voteComment(comment.id, "upVote")}><FaThumbsOUp className="rd-thumb-up" size={20}/></a>
        </div>
        <div className="col-md-1">
        <a  onClick={() => voteComment(comment.id, "downVote")}><FaThumbsODown className="rd-thumb-down" size={20}/></a>
        </div>
        <div className="col-md-1">
          {comment.voteScore >= 0
            ? <i className="vote-number"><FaThumbsOUp size={20} className="thumb-vote"/>{comment.voteScore}</i>
            : <i className="vote-number"><FaThumbsODown size={20} className="thumb-negative" />{comment.voteScore}</i>
          }
        </div>
        <div className="col-md-1">
          <a className="rd-list-element-post rd-post-pointer" onClick={() => openEditComment(comment.id)}><FaEdit className="rd-edit" size={20}/></a>
        </div>
        <div className="col-md-1">
          <a className="rd-list-element-post rd-post-pointer" onClick={() => onRemoveComment(comment)}><FaTrashO className="rd-trash" size={20}/></a>
        </div>
        <div className="col-md-3">
          <a style={{color:'#b9b9b9'}}>{convertDate(comment.timestamp)}</a>
        </div>
      </div>      
      {editComment && comment.id === idComment && (
        <Modal
          isOpen={editComment}
          onRequestClose={onCloseForm}
          style={customStyles}
          ariaHideApp={false}
        >
          <CreateComment           
            objComment={comment}
            onCloseForm={onCloseForm}
            edit={true}
          /> 
        </Modal>       
      )}      
    </li>
    )
  }
}
export default Comment

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