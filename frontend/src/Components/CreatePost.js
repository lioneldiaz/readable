import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize'
import { fetchAddPost, fetchPostById, fetchEditPost } from '../Actions/postAction'
import { fetchCategories } from '../Actions/categoryAction'
import { generateKey } from '../Util/helpers'

class CreatePost extends Component {
  constructor () {
    super();
    this.state = {
      value: 'select'
    }
  }
  handleSubmit = (event) => {
    event.preventDefault()
    const post = serializeForm(event.target, { hash: true })
    !this.props.edit
      ? this.props.addPost(post)
      : this.props.editPost(post)
  }
  componentDidMount () {
    if (this.props.categories.categories.length === 0) {
      this.props.getPostById(this.props.match.params.id)
      this.props.getCategories()
    }
  } 
  render() {
    const { categories, posts, edit } = this.props    
    return (      
      <div>
        <Link className="close-create-post" to="/">Close</Link>  
        {posts.posts.length !== 0
          ? <form className="create-contact-form" onSubmit={this.handleSubmit}>
              <div className="create-contact-details">
                <input type="hidden" name="id" defaultValue={edit ? posts.posts["0"].id :generateKey()} />
                <input type="hidden" name="timestamp" defaultValue={edit ? posts.posts["0"].timestamp :Date.now()} />
                <input type="text" name="title" placeholder="Title" defaultValue={edit ? posts.posts["0"].title : this.props.title} />
                <textarea name = "body" placeholder = "Body" defaultValue={edit ? posts.posts["0"].body :this.props.body} />
                <input type="text" name="author" placeholder="Author" defaultValue={edit ? posts.posts["0"].author :this.props.author} />
                <select name="category" defaultValue={edit ? posts.posts["0"].category :this.state.valueCategory} >
                  <option value="select">--Select--</option>
                  {categories.categories.map((category, index) => (
                    <option key={index} value={this.state.valueCategory}>{category.name}</option>
                  ))}              
                </select>           
                <button>{edit ? "Edit" :"Save"}</button>
              </div>
            </form>
          :null
        }          
      </div>
    )
  }
}
/**
 * @description Specify which data from the store you passed to your React component
 * @param {Object} state - The current store state
 * @return {Object}
 */
function mapStateToProps (state) {
  return {
    categories: state.categories,
    posts: state.posts
  }
}
/**
 * @description Bind dispatch to your action creators before they ever hit your component
 * @param {function} dispatch - Our specific props
 * @return {Object}
 */
function mapDispatchToProps (dispatch) {
  return {
    addPost: (post) => dispatch(fetchAddPost(post)),
    getPostById: (idPost) => dispatch(fetchPostById(idPost)),
    editPost: (post) => dispatch(fetchEditPost(post)),
    getCategories: () => dispatch(fetchCategories(dispatch))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)