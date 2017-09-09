import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'

class CommentForm extends Component {

  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this)
    this.author = ''
    this.body = ''
  }

  onFormSubmit(event) {
    event.preventDefault()
    const {onSubmit, comment} = this.props

    if (onSubmit && this.body.value && this.author.value) {
      onSubmit({body: this.body.value, author: this.author.value, id: comment && comment.id})
    }
  }

  onCancel(event) {
    event.preventDefault()
    const {onClose} = this.props
    if(onClose){
      onClose()
    }
  }

  render() {
    const {comment, submitBtnText, post, onCancel} = this.props
    const {body, author} = comment || {}

    return (
      <form onSubmit={this.onFormSubmit} className="pure-form comment-form">
        <fieldset className="pure-group">
          {post && (<h3 className="form-title">Comment for posted titled <code>{post.title}</code></h3>)}
          <input type="text" className="pure-input-1" placeholder="Name" defaultValue={author} disabled={author? "disabled" : ""} ref={(input) => {
            this.author = input;
          }}/>
          <textarea className="pure-input-1 comment-body-edit" placeholder="Comment" defaultValue={body} ref={(input) => {
            this.body = input;
          }}></textarea>
        </fieldset>
        <button type="button" className="pure-button pure-input-1-2 pure-button-default" onClick={this.onCancel}>Cancel</button>
        <button type="submit" className="pure-button pure-input-1-2 pure-button-primary">{submitBtnText || 'Publish'}</button>
      </form>
    );
  }
}

export default CommentForm
