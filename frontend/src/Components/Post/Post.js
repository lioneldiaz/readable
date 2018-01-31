import React from 'react'
import { Link } from 'react-router-dom'
import FaCommentO from 'react-icons/lib/fa/comment-o'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'
import FaTrashO from 'react-icons/lib/fa/trash-o'
import FaEdit from 'react-icons/lib/fa/edit'
import FaUser from 'react-icons/lib/fa/user'
import { convertDate } from '../../Util/helpers'
import { briefBody } from '../../Util/helpers'
import './Post.css'

const Post = ({post, onVote, onRemovePost, typeVote, typeRemove}) => {
  return (
    <div className="card post-margin">
      <div className="top-card-category" style={{backgroundColor:post.category==='react'?'#61DAFB':post.category==='redux'?'#7747BC':'#02B3E4'}}/>
      <div className="card-body">
        <Link 
        style={{color: 'black'}}
        to={{
          pathname: `/${post.category}/${post.id}`
        }}>
          <h5 className="card-title">{post.title}</h5>
          <p className="card-text">{briefBody(`${post.body}`, typeVote)}</p>
        </Link>
      </div>
      <div className="card-footer">
        <FaUser className="rd-post-icon-author" size={40}/>        
        <small className="text-muted rd-post-author"><strong>{post.author}</strong></small>
      </div>
      <div className="card-footer">
        <small className="text-muted">{convertDate(post.timestamp)}</small>
        <div className="list-separator-post">
        <a className="list-element-post post-pointer" onClick={() => onRemovePost(post, typeRemove)}><FaTrashO className="trash trash-hover" size={20}/></a>
        <Link to={{
          pathname: `/posts/edit/${post.id}`
        }}>
          <FaEdit size={20}/>
        </Link>       
        <a className="list-element-post"><FaCommentO className="comment-number" size={20}/>{post.commentCount}</a>
        <a className="list-element-post">          
          {post.voteScore >= 0
            ? <i className="vote-number"><FaThumbsOUp size={20} className="thumb-vote" />{post.voteScore}</i>
            : <i className="vote-number"><FaThumbsODown size={20} className="thumb-negative" />{post.voteScore}</i>
          }         
        </a>
        <a className="list-element-post post-pointer" onClick={() => onVote(post.id, "downVote", typeVote)}><FaThumbsODown className="trash thumb" size={20}/></a>
        <a className="list-element-post post-pointer" onClick={() => onVote(post.id, "upVote", typeVote)}><FaThumbsOUp className="trash thumb" size={20}/></a>
      </div>  
      </div>
    </div>
  )
}
export default Post