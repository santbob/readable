import React, {Component} from 'react';
import {Link} from 'react-router-dom'

class Crumb extends Component {
  render() {
    const {hasDelimiter, path} = this.props
    return (
      <li key={path} className="nav-item">
        {hasDelimiter && (<Link to={"/" + path}>{path ? path: "Posts"}</Link>)}
        {hasDelimiter && (<span className="delimit">&gt;</span>)}
        {!hasDelimiter && (<span className="nolink">{path ? path: "Posts"}</span>)}
      </li>
    )
  }
}

export default Crumb
