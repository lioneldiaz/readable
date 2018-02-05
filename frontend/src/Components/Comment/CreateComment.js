import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchEditComment } from '../../Actions/commentAction'
import { generateKey, validateLetter } from '../../Util/helpers'
import serializeForm from 'form-serialize'

class CreateComment extends Component {
  /**
   * @description Represent CreatComment
   * @param {props} props
   */
  constructor(props){
    super(props)
    this.state = {
      id: props.edit ? props.objComment.id : generateKey(),
      body: props.edit ? props.objComment.body: '',
      author: props.edit ? props.objComment.author: '',
      timestamp: Date.now(),
      validateAuthor: true,
      validateBody: true
    }
  }
  /**
   * @description Validate the props declared
   */
  static propTypes = {
    edit: PropTypes.bool.isRequired,
    onCloseForm: PropTypes.func.isRequired
  }
  /**
   * @description Create comment
   */
  handleSubmit = (event) => {
    event.preventDefault()
    const comment = serializeForm(event.target, {hash: true})
    comment.timestamp = this.state.timestamp
    comment.author === undefined && this.setState(() => ({validateAuthor: false}))  
    comment.body === undefined && this.setState(() => ({validateBody: false}))
    if (comment.author !== undefined && comment.body !== undefined) {
        comment.body.trim() !== ""
        ? (!this.props.edit
          ? this.props.onAddComment(comment) 
          : this.props.dispatch(fetchEditComment(comment)),
          this.props.onCloseForm())
        : this.setState(() => ({validateBody: false}))     
      }
  }
  /**
   * @description Chande the value of each element in the form
   */
  handleChange = (event) => {
    const target = event.target
    let value = target.value
    const name = target.name
    name === 'author' && (
      !validateLetter(value) && (
        value = value.slice(0,value.length-1)
      ),
      name === 'author' && (
        value !== ''
        ? this.setState({validateAuthor: true})
        : this.setState({validateAuthor: false})
      )
    )
    name === 'body' && (
      value !== ''
      ? this.setState({validateBody: true})
      : this.setState({validateBody: false})
    )    
    this.setState(() => ({
      [name]: value
    }))
  }
  render () {
    const {edit, onCloseForm}=this.props
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input className="form-control" hidden={true} type="text" name="id" value={this.state.id} onChange={this.handleChange}/>
        </div>
        <div className="form-group"> 
          <input className="form-control" hidden={true} type="number" name="timestamp" value={this.state.timestamp} onChange={this.handleChange}/>
        </div>
        <div className="form-group">  
          <input className="form-control" hidden={edit ? true : false} type="text" name="author" placeholder="Author" value={this.state.author} onChange={this.handleChange} />
          <div hidden={this.state.validateAuthor} className="rd-post-validate-field-danger">Field Required</div>
        </div>
        <div className="form-group">  
          <textarea className="form-control" rows="4" name="body" placeholder="Body" value={this.state.body} onChange={this.handleChange} />
          <div hidden={this.state.validateBody} className="rd-post-validate-field-danger">Field Required</div>
        </div>          
        <div className="form-group">  
          <input className="form-control" hidden={true} type="text" name="parentId" value={this.props.idPost} onChange={this.handleChange}/>
        </div>
        <div className="row">
          <div className="col">
            <button className="btn rd-button" style={{float:'left'}}>{edit ? 'Edit': 'Save'}</button>
          </div>
          <div className="col">
            <button className="btn rd-button" style={{float:'right'}} onClick={onCloseForm}>Cancel</button>
          </div>
        </div>
      </form>
    )
  }
}
export default connect()(CreateComment)