import { 
  GET_COMMENTS, 
  ADD_COMMENT,
  EDIT_COMMENT,
  REMOVE_COMMENT
} from '../Actions/commentAction'

const initialComments = {
  comments: []
}
export function comments (state = initialComments, action) {
  switch (action.type) {
    case GET_COMMENTS :
    const { comments } = action
      return {
        ...state,
        comments
      }
    case ADD_COMMENT :
      const { newComment } = action
      return {
        ...state,
        comments: [...state.comments, newComment]
      }
    case EDIT_COMMENT :
      const { idEditComment, timestampEditComment, bodyEditComment } = action
      return {
        ...state,
        comments: state.comments.map(comment => 
          {
            comment.id === idEditComment && (
              comment.timestamp = timestampEditComment,
              comment.body = bodyEditComment
            )
            return comment
          })        
      }
    case REMOVE_COMMENT :
      const { idComment } = action
      return {
        ...state,
        comments: [...state.comments.filter(comment => comment.id !==  idComment)]
      }
    default :
      return state
  }
}