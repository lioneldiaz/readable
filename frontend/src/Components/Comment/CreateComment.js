import React, { Component } from 'react'
import { generateKey } from '../../Util/helpers'
import serializeForm from 'form-serialize'

class CreateComment extends Component {
  /**
   * @description Represent CreatComment
   * @param {props} props
   */
  constructor(props){
    super(props)
    this.state = {
      body: props.edit ? props.objComment.body: props.body,
      timestamp: Date.now()
    }
  }
  /**
   * @description Create comment
   */
  handleSubmit = (event) => {
    event.preventDefault()
    const comment = serializeForm(event.target, {hash: true})
    comment.timestamp = this.state.timestamp   
    !this.props.edit
      ? this.props.onAddComment(comment) 
      : this.props.onEditComment(comment)
    this.props.onCloseForm()
  }
  /**
   * @description Chande the value of each element in the form
   */
  handleChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name   
    this.setState(() => ({
      [name]: value
    }))
  }
  render () {
    const {objComment, edit, onCloseForm}=this.props
    console.log("Comment", objComment)
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input className="form-control" hidden={true} type="text" name="id" value={edit ? objComment.id : generateKey()} onChange={this.handleChange}/>
        </div>
        <div className="form-group"> 
          <input className="form-control" hidden={true} type="number" name="timestamp" value={this.state.timestamp} onChange={this.handleChange}/>
        </div>
        <div className="form-group">  
          <input className="form-control" hidden={edit ? true : false} type="text" name="author" placeholder="Author" onChange={this.handleChange} />
        </div>
        <div className="form-group">  
          <textarea className="form-control" rows="4" name="body" placeholder="Body" value={this.state.body} onChange={this.handleChange} />
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
export default CreateComment