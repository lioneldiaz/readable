import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize'
import PropTypes from 'prop-types'
import { fetchAddPost, fetchPostById, fetchEditPost } from '../../Actions/postAction'
import { fetchCategories } from '../../Actions/categoryAction'
import { generateKey } from '../../Util/helpers'

class CreatePost extends Component {
  /**
   * @description Represent CreatePost
   * @param {props} props 
   */
  constructor (props) {
    super(props)
    this.state = {
      id: generateKey(),
      title: '',
      body: '',
      author: '',
      category: 'Choose',
      timestamp: Date.now()
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
    post.timestamp = this.state.timestamp
    console.log("Object post", post)
    !this.props.edit
      ? this.props.addPost(post)
      : this.props.editPost(post)
    this.props.history.push('/')
  }
  /**
   * @description Change the value of each element in the form
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
      id: nextProps.postDetails.id,
      title: nextProps.postDetails.title,
      body: nextProps.postDetails.body,
      category: nextProps.postDetails.category
    })     
  }
  /**
   * @description Invoke immediately after the component is inserted in the DOM
   */
  componentDidMount () {
    this.props.categories.length === 0 && !this.props.edit && this.props.getCategories()
    this.props.edit && this.props.getPostById(this.props.match.params.id)     
  }
  render() {
    const {categories, edit}=this.props    
    return (  
      <div >
        <Link className="close-create-post" to="/">Close</Link>        
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <form className="text-center" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input className="form-control" hidden={true} type="text" name="id" value={this.state.id} onChange={this.handleChange}/>
              </div>
              <div className="form-group">  
                <input className="form-control" hidden={true} type="text" name="timestamp" value={this.state.timestamp} onChange={this.handleChange}/>
              </div>
              <div className="form-group">
                <input className="form-control" type="text" name="title" placeholder="Title" value={this.state.title} onChange={this.handleChange}/>  
              </div>
              <div className="form-group">
                <textarea className="form-control" name="body" placeholder="Body" value={this.state.body} onChange={this.handleChange}/> 
              </div>
              <div className="form-group">
                <input className="form-control" hidden={edit ? true :false} type="text" name="author" placeholder="Author" value={this.state.author} onChange={this.handleChange}/>
              </div>
              <div className="form-group">
                <select className="form-control" hidden={edit ? true :false} name="category" value={this.state.category} onChange={this.handleChange} >
                  <option value="Choose" disabled>{this.state.category}</option>
                  {categories.map((category, index) => (
                    <option key={index} value={this.props.category}>{category.name}</option>
                  ))}              
                </select>
              </div>         
              <button className="btn rd-button">{edit ? "Edit" :"Save"}</button>         
            </form>
          
          </div>
        </div>  
      </div>     
    )
  }
}
/**
 * @description Specify which data from the store you passed to your React component
 * @param {Object} categories
 * @param {Object} posts
 * @return {Object}
 */
function mapStateToProps ({categories, posts}) {
  return {
    categories: Object.keys(categories).map(key => categories[key]),
    postDetails: posts.postDetails
  }
}
/**
 * @description Bind dispatch to your action creators before they ever hit your component
 * @param {function} dispatch
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