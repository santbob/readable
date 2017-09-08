import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'

class PostForm extends Component {

  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.selectedCategory = ''
    this.author = ''
    this.body = ''
    this.title = ''
  }

  onFormSubmit(event) {
    event.preventDefault()
    const {onSubmit} = this.props

    if (onSubmit && this.title.value && this.body.value && this.author.value && this.selectedCategory) {
      onSubmit({title: this.title.value, body: this.body.value, author: this.author.value, category: this.selectedCategory})
    }
  }

  render() {
    const {categories, submitBtnText, post} = this.props

    const {title, body, author, category } = post || {}

    this.selectedCategory = this.selectedCategory || category || (categories[0]? categories[0].path : "")

    return (
      <form onSubmit={this.onFormSubmit} className="pure-form create-post-form">
       <fieldset className="pure-group">
          <label htmlFor="category">Category</label>
          <select id="category" className="pure-input-1" disabled={category? "disabled" : ""} value={this.selectedCategory} onChange={(event) => this.selectedCategory = event.target.value}>
            {categories && categories.map((category) => (
              <option key={category.path}>{category.name}</option>
            ))}
          </select>
        </fieldset>

        <fieldset className="pure-group">
          <input type="text" className="pure-input-1" placeholder="Author Name" defaultValue={author} disabled={author? "disabled" : ""} ref={(input) => {
            this.author = input;
          }}/>
          <input type="text" className="pure-input-1" placeholder="A title for your post" defaultValue={title} ref={(input) => {
            this.title = input;
          }}/>
          <textarea className="pure-input-1 post-body-edit" placeholder="Content of your post" defaultValue={body} ref={(input) => {
            this.body = input;
          }}></textarea>
        </fieldset>
        <Link className="pure-input-1-2 pure-button pure-input-1-2 pure-button-default" to="/">Cancel</Link>
        <button type="submit" className="pure-button pure-input-1-2 pure-button-primary">{submitBtnText || 'Publish'}</button>
      </form>
    );
  }
}

export default PostForm
