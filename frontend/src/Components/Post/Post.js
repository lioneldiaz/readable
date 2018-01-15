import React from 'react'
import { Link } from 'react-router-dom'
import FaCommentO from 'react-icons/lib/fa/comment-o'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'
import FaTrashO from 'react-icons/lib/fa/trash-o'
import FaEdit from 'react-icons/lib/fa/edit'
import { convertDate } from '../../Util/helpers'

const Post = ({post, onVote, removePost}) => {
  return (
    <div className="post" >
      <div className="post-pointer">
        <p><strong>Title:</strong> {post.title}</p>
        <p><strong>Date:</strong> {convertDate(post.timestamp)}</p>
        <p><strong>Body:</strong> {post.body}</p>
        <p><strong>Author:</strong> {post.author}</p>
        <Link to={{
          pathname: `/${post.category}/${post.id}`
        }}>
          Details
        </Link>
      </div>            
      <div className="list-separator-post">
        <a className="list-element-post post-pointer" onClick={() => removePost(post)}><FaTrashO className="trash trash-hover" size={20}/></a>
        <Link to={{
          pathname: `/posts/${post.id}`
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
        <a className="list-element-post post-pointer" onClick={() => onVote(post.id, "downVote")}><FaThumbsODown className="trash thumb" size={20}/></a>
        <a className="list-element-post post-pointer" onClick={() => onVote(post.id, "upVote")}><FaThumbsOUp className="trash thumb" size={20}/></a>
      </div>  
    </div>
  )
}
export default Post