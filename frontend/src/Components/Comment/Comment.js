import React, { Component } from 'react'
import FaUser from 'react-icons/lib/fa/user'
import CreateComment from './CreateComment'
import FaTrashO from 'react-icons/lib/fa/trash-o'
import FaEdit from 'react-icons/lib/fa/edit'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'
import FaSmileO from 'react-icons/lib/fa/smile-o'
import { convertDate } from '../../Util/helpers'
import ReactModal from 'react-modal'
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
   * @description Allow show up menu or hide for upvote or downvote
   */
  openVoteMenu = () => {
    this.state.menuVote
    ? this.setState(() => ({menuVote: false}))
    : this.setState(() => ({menuVote: true}))
  }   
  render () {
    const {comment, editComment, voteComment, openEditComment, onRemoveComment, idComment, 
      onEditComment, onCloseForm, onMenu, menu}=this.props
    const {commentModal}=this.state
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
      <div className="row">
        <div className="col-md-12">
          <a className="rd-comment-aling-item" onMouseOver={this.openVoteMenu}>Vote</a>
          <div className="rd-comment-vote" onMouseLeave={this.openVoteMenu} hidden={this.state.menuVote}>           
            <a className="rd-comment-separator-vote" onClick={() => voteComment(comment.id, "upVote")}><FaThumbsOUp className="thumb-vote rd-comment-zoom" size={30}/></a>
            <a className="rd-comment-separator-vote" onClick={() => voteComment(comment.id, "downVote")}><FaThumbsODown className="thumb-negative rd-comment-zoom" size={30}/></a>
          </div>
          <a className="rd-comment-number-vote">
            {comment.voteScore >= 0
              ? <i className="vote-number"><FaThumbsOUp size={20} className="thumb-vote" />{comment.voteScore}</i>
              : <i className="vote-number"><FaThumbsODown size={20} className="thumb-negative" />{comment.voteScore}</i>
            }         
          </a>
          <a>{convertDate(comment.timestamp)}</a>
          <a className="list-element-post post-pointer" onClick={() => onRemoveComment(comment)}><FaTrashO className="trash trash-hover" size={20}/></a>
          <a className="list-element-post post-pointer" onClick={() => openEditComment(comment.id)}><FaEdit className="trash edit-hover" size={20}/></a>
        </div>
      </div>      
      {editComment && comment.id === idComment && (
        <ReactModal
        isOpen={editComment}
        onRequestClose={onCloseForm}
        style={{ 
          overlay: {},
          content: {left: 350, right: 350, top: 150, bottom: 150} 
        }}
        >
          <CreateComment           
            objComment={comment}
            onEditComment={onEditComment}
            onCloseForm={onCloseForm}
            edit={true}
          /> 
        </ReactModal>       
      )}      
    </li>
    )
  }
}
export default Comment