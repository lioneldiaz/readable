import React from 'react'
import CreateComment from './CreateComment'
import FaTrashO from 'react-icons/lib/fa/trash-o'
import FaEdit from 'react-icons/lib/fa/edit'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'
import { convertDate } from '../../Util/helpers'

const Comment = ({
  comment, 
  editComment, 
  voteComment, 
  openEditComment, 
  onRemoveComment, 
  idComment, 
  onEditComment,
  onCloseForm  
}) => {
  return (
  <li className="comment byuser comment-author-chriscoyier bypostauthor odd alt depth-2" id="li-comment-147038">
   
  <div className="grid group comment-wrap" id="comment-147038">
    <div className="user-comment"/> 
    <div className="comment-body group grid-4-5">
      <div className="comment-author-wrap vcard">
        <div className="comment-author"><strong>{comment.author}</strong></div> 
        <div className="comment-time">            
          {convertDate(comment.timestamp)}
        </div>
      </div>
      <div className="comment-content">
      <p className="p-comment">{comment.body}</p>  
      </div>
    </div>

    {editComment && comment.id === idComment && (
        <CreateComment 
          edit={true}
          objComment={comment}
          onEditComment={onEditComment}
          onCloseForm={onCloseForm}
        />
      )}      
      <div className="list-separator-post">       
        <a className="list-element-post post-pointer" onClick={() => onRemoveComment(comment)}><FaTrashO className="trash trash-hover" size={20}/></a>
        <a className="list-element-post post-pointer" onClick={() => openEditComment(comment.id)}><FaEdit className="trash edit-hover" size={20}/></a>
        <a className="list-element-post">          
          {comment.voteScore >= 0
            ? <i className="vote-number"><FaThumbsOUp size={20} className="thumb-vote" />{comment.voteScore}</i>
            : <i className="vote-number"><FaThumbsODown size={20} className="thumb-negative" />{comment.voteScore}</i>
          }         
        </a>
        <a className="list-element-post post-pointer" onClick={() => voteComment(comment.id, "downVote")}><FaThumbsODown className="trash thumb" size={20}/></a>
        <a className="list-element-post post-pointer" onClick={() => voteComment(comment.id, "upVote")}><FaThumbsOUp className="trash thumb" size={20}/></a>
      </div>
  </div>
  </li>
  )
}
export default Comment