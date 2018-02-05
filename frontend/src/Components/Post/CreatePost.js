import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize'
import PropTypes from 'prop-types'
import { fetchAddPost, fetchPostById, fetchEditPost } from '../../Actions/postAction'
import { fetchCategories } from '../../Actions/categoryAction'
import { generateKey, validateLetter } from '../../Util/helpers'

class CreatePost extends Component {
  /**
   * @description Represent CreatePost
   */
  constructor (props) {
    super(props)
    this.state = {
      id: generateKey(),
      title: '',
      body: '',
      author: '',
      category: props.edit ? props.category :'Choose',
      timestamp: Date.now(),
      validateTitle: true,
      validateBody: true,
      validateCategory: true,
    }
  }
  /**
   * @description Validation of the data types passed to the component
   */
  static propTypes = {
    edit: PropTypes.bool.isRequired,
    match: PropTypes.object.isRequired,
    postDetails: PropTypes.object.isRequired,
    categories: PropTypes.array.isRequired,
    addPost: PropTypes.func.isRequired,
    getCategories: PropTypes.func.isRequired,
    getPostById: PropTypes.func.isRequired,
    editPost: PropTypes.func.isRequired
  }
  /**
   * @description Create or Edit a post
   */
  handleSubmit = (event) => {
    event.preventDefault()
    const target = event.target
    const post = serializeForm(target, { hash: true })
    post.timestamp = this.state.timestamp
    post.title === undefined && this.setState(() => ({validateTitle: false}))
    post.body === undefined && this.setState(() => ({validateBody: false}))
    post.category === 'Choose' && this.setState(() => ({validateCategory: false}))
    post.title !== undefined && post.body !== undefined && post.category !== 'Choose' && (
      post.body.trim() !== ""
      ? (!this.props.edit
          ? this.props.addPost(post)
          : this.props.editPost(post),
        this.props.history.push('/'))
      : this.setState(() => ({validateBody: false}))
    )
  }
  /**
   * @description Change the value of each element in the form
   */
  handleChange = (event) => {
    const target = event.target
    let value = target.value
    const name = target.name
    if (name === 'title' || name === 'author') {
      !validateLetter(value) && (
        value = value.slice(0,value.length-1)
      )
      name === 'title' && (
        value !== ''
        ? this.setState({validateTitle: true})
        : this.setState({validateTitle: false})
      )
    }
    name === 'body' && (
      value !== ''
      ? this.setState({validateBody: true})
      : this.setState({validateBody: false})
    )
    name === 'category' && (
      value !== 'Choose'
      ? this.setState({validateCategory: true})
      : this.setState({validateCategory: false})
    )
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
        category: nextProps.postDetails.category,     
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
      <div className="row">         
        <div className="col-md-6 offset-3">
        <Link className="rd-close-create-post" to="/">Close</Link>                
          <form className="text-center" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input className="form-control" hidden={true} type="text" name="id" value={this.state.id} onChange={this.handleChange}/>
            </div>
            <div className="form-group">  
              <input className="form-control" hidden={true} type="text" name="timestamp" value={this.state.timestamp} onChange={this.handleChange}/>
            </div>
            <div className="form-group">
              <input className="form-control" type="text" name="title" placeholder="Title" value={this.state.title} onChange={this.handleChange} />
              <div hidden={this.state.validateTitle} className="rd-post-validate-field-danger">Field Required</div>
            </div>
            <div className="form-group">
              <textarea className="form-control" name="body" placeholder="Body" value={this.state.body} onChange={this.handleChange}/> 
              <div hidden={this.state.validateBody} className="rd-post-validate-field-danger">Field Required</div>
            </div>
            <div className="form-group">
              <input className="form-control" hidden={edit ? true :false} type="text" name="author" placeholder="Author" value={this.state.author} onChange={this.handleChange}/>
            </div>
            <div className="form-group">
              <select className="form-control custom-select" hidden={edit ? true :false} name="category" value={this.state.category} onChange={this.handleChange} >
                <option value="Choose" disabled>Choose</option>
                {categories.map((category, index) => (
                  <option key={index} value={category.name}>{category.name}</option>
                ))}              
              </select>
              <div hidden={this.state.validateCategory} className="rd-post-validate-field-danger">Field Required</div>
            </div>
            <div className="form-group">
                <button className="btn rd-button">{edit ? "Edit" :"Save"}</button>            
            </div>       
          </form>
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