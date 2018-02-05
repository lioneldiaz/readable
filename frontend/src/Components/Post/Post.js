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
      <div className="rd-top-card-category" style={{backgroundColor:post.category==='react'?'#61DAFB':post.category==='redux'?'#7747BC':'#02B3E4'}}/>
      <div className="card-body">        
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">          
          {briefBody(`${post.body}`, typeVote)}
          {typeVote !== 'postDetails' &&
            <Link 
              style={{color: '#02B3E4'}}
              to={{
                pathname: `/${post.category}/${post.id}`
              }}>
            See more
            </Link>
          }          
        </p>
      </div>
      <div className="card-footer">
        <FaUser className="rd-post-icon-author" size={40}/>        
        <small className="text-muted rd-post-author"><strong>{post.author === undefined ? 'Unknow' : post.author}</strong></small>
      </div>
      <div className="card-footer">
        <small className="text-muted">{convertDate(post.timestamp)}</small>
        <div className="rd-list-separator-post">
        <a className="rd-list-element-post rd-post-pointer" onClick={() => onRemovePost(post, typeRemove)}><FaTrashO className="rd-trash" size={20}/></a>      
        <a className="rd-list-element-post"><FaCommentO className="comment-number" size={20}/>{post.commentCount}</a>
        <a className="rd-list-element-post">          
          {post.voteScore >= 0
            ? <i className="vote-number"><FaThumbsOUp size={20} className="thumb-vote" />{post.voteScore}</i>
            : <i className="vote-number"><FaThumbsODown size={20} className="thumb-negative" />{post.voteScore}</i>
          }         
        </a>
        <a className="rd-list-element-post rd-post-pointer" onClick={() => onVote(post.id, "downVote", typeVote)}><FaThumbsODown className="rd-thumb-down" size={20}/></a>
        <a className="rd-list-element-post rd-post-pointer" onClick={() => onVote(post.id, "upVote", typeVote)}><FaThumbsOUp className="rd-thumb-up" size={20}/></a>
        <Link 
          className="rd-edit"
          to={{
            pathname: `/posts/edit/${post.id}`
          }}
        >
          <FaEdit size={20}/>
        </Link> 
      </div>  
      </div>
    </div>
  )
}
export default Post