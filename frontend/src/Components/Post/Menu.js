import React from 'react'
import { Link } from 'react-router-dom'
import FaPlus from 'react-icons/lib/fa/plus'
import FaSortNumericAsc from 'react-icons/lib/fa/sort-numeric-asc'
import FaSortNumericDesc from 'react-icons/lib/fa/sort-numeric-desc'
import { generateKey } from '../../Util/helpers'

const Menu = ({sortPost, posts, typeMenu, openAddComment}) => {
  return (
    <ul className="list-menu">
      {typeMenu === "postMenu"
        ? [
          <li key={generateKey()}><FaPlus size={15}/>            
            <Link className="rd-text-menu" style={{color: '#484B4F'}} to="/new/post/create">Add post</Link>                        
          </li>,
          <li key={generateKey()} onClick={() => sortPost(posts,"ASC","timestamp")}>
            <FaSortNumericAsc size={15}/>
            <a className="rd-text-menu">Sort Date</a>
          </li>,
          <li key={generateKey()} onClick={() => sortPost(posts,"DESC","timestamp")}>
            <FaSortNumericDesc size={15}/>
            <a className="rd-text-menu">Sort Date</a>
          </li>,
          <li key={generateKey()} onClick={() => sortPost(posts,"ASC","voteScore")}>
            <FaSortNumericAsc size={15}/>
            <a className="rd-text-menu">Sort Vote Score</a>
          </li>,
          <li key={generateKey()} onClick={() => sortPost(posts,"DESC","voteScore")}>
            <FaSortNumericDesc size={15}/>
            <a className="rd-text-menu">Sort Vote Score</a>
          </li>]
        : <li key={generateKey()}><FaPlus size={15}/>
            <a className="rd-text-menu" onClick={() => openAddComment()}>Add comment</a>                
          </li>
      }
    </ul>
  )
}
export default Menu