import React, {Component} from 'react'
import {postCreated} from '../actions'
import * as API from '../api'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'

class CreatePost extends Component {

  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.category = ''
  }

  onFormSubmit(event) {
    event.preventDefault()
    const {postCreated, history: { push } } = this.props
    if(this.title.value && this.body.value && this.author.value && this.category) {
      API.addNewPost(this.title.value, this.body.value, this.author.value, this.category).then((post) => {
          postCreated(post)
          push("/")
      })
    }
  }

  render() {
    const {categories} = this.props
    return (
      <form onSubmit={this.onFormSubmit} className="pure-form create-post-form">
        <fieldset className="pure-group">
          <label htmlFor="state">Category</label>
          <select id="category" className="pure-input-1" value={this.category} onChange={(event) => this.category = event.target.value}>
            {categories && categories.map((category) => (
              <option key={category.path}>{category.name}</option>
            ))}
          </select>
        </fieldset>

        <fieldset className="pure-group">
          <input type="text" className="pure-input-1" placeholder="Author Name" ref={(input) => {
            this.author = input;
          }}/>
          <input type="text" className="pure-input-1" placeholder="A title for your post" ref={(input) => {
            this.title = input;
          }}/>
          <textarea className="pure-input-1 post-body-edit" placeholder="Content of your post" ref={(input) => {
            this.body = input;
          }}></textarea>
        </fieldset>
        <Link className="pure-input-1-2 pure-button pure-input-1-2 pure-button-default" to="/">Cancel</Link>
        <button type="submit" className="pure-button pure-input-1-2 pure-button-primary">Publish</button>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    postCreated: (post) => dispatch(postCreated(post))
  }
}

function mapStateToProps({categories}) {
  return {categories}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)
