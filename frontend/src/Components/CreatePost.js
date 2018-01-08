import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize'
import PropTypes from 'prop-types'
import { fetchAddPost, fetchPostById, fetchEditPost } from '../Actions/postAction'
import { fetchCategories } from '../Actions/categoryAction'
import { generateKey } from '../Util/helpers'

class CreatePost extends Component {
  /**
   * @description Represent CreatePost
   * @param {props} props 
   */
  constructor (props) {
    super(props);
    this.state = {
      valueCategory: 'select',
      title: props.title,
      body: props.body
    }
  }
  /**
   * @description Validation of the data types passed to the component
   */
  static propTypes = {
    edit: PropTypes.bool.isRequired,
    match: PropTypes.object.isRequired
  }
  /**
   * @description Create or Edit a post
   */
  handleSubmit = (event) => {
    event.preventDefault()
    const post = serializeForm(event.target, { hash: true })
    !this.props.edit
      ? this.props.addPost(post)
      : this.props.editPost(post)
    this.props.history.push('/')
  }
  /**
   * @description Change the value of each state declared in the constructor
   */
  handleChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({ 
      [name]: value
    })
  }
  /**
   * @description Invoke whenever the component is about to receive brand new props
   * @param {Object} nextProps
   */
  componentWillReceiveProps (nextProps) {
    this.setState({
      title: nextProps.posts.post.title,
      body: nextProps.posts.post.body
    })     
  }
  /**
   * @description Invoke immediately after the component is inserted in the DOM
   */
  componentDidMount () {
    this.props.categories.categories.length === 0 && !this.props.edit && this.props.getCategories()
    this.props.edit && this.props.getPostById(this.props.match.params.id)     
  }
  render() {
    const {categories, posts, edit}=this.props
    const p=posts.post
    return (  
      <div>
        <Link className="close-create-post" to="/">Close</Link> 
        <form onSubmit={this.handleSubmit}>
          <div className="create-contact-details">
            <input hidden={true} type="text" name="id" value={edit ? p.id :generateKey()} onChange={this.handleChange} />
            <input hidden={true} type="text" name="timestamp" value={edit ? p.timestamp :Date.now()} onChange={this.handleChange}/>
            <input name="title" type="text" placeholder="Title" value={this.state.title} onChange={this.handleChange}/>
            <textarea name = "body" placeholder = "Body" value={this.state.body} onChange={this.handleChange}/> 
            <input hidden={edit ? true :false} type="text" name="author" placeholder="Author" value={this.props.author} onChange={this.handleChange}/>
            <select hidden={edit ? true :false} name="valueCategory" value={this.state.valueCategory} onChange={this.handleChange} >
              <option value="select" disabled>--Select--</option>
              {categories.categories.map((category, index) => (
                <option key={index} value={this.state.category}>{category.name}</option>
              ))}              
            </select>           
            <button>{edit ? "Edit" :"Save"}</button>
          </div>
        </form>    
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