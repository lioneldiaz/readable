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
      body: props.edit ? props.objComment.body: props.body
    }
  }
  /**
   * @description Create comment
   */
  handleSubmit = (event) => {
    event.preventDefault()
    const comment = serializeForm(event.target, { hash: true})    
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
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input hidden={true} type="text" name="id" value={edit ? objComment.id : generateKey()} onChange={this.handleChange}/>
          <input hidden={true} type="text" name="timestamp" value={Date.now()} onChange={this.handleChange}/>
          <textarea name="body" placeholder="Body" value={this.state.body} onChange={this.handleChange} />
          <input hidden={edit ? true : false} type="text" name="author" placeholder="Author" onChange={this.handleChange} />
          <input hidden={true} type="text" name="parentId" value={this.props.idPost} onChange={this.handleChange}/>
          <button>{edit ? 'Edit': 'Save'}</button>         
        </form>
        <button onClick={onCloseForm}>Cancel</button>
      </div>
    )
  }
}

export default CreateComment