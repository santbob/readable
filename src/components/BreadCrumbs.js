import React, {Component} from 'react';
import * as utils from '../utils'
import Crumb from './Crumb'

class BreadCrumbs extends Component {
  render() {
    const {url} = this.props
    const paths = utils.pathFromUrl(url)
    const lastItemIndex = paths && (paths.length - 1)

    return (
      <ul className="nav-list breadcrumb">
        {paths && paths.length > 1 && paths.map((path, index) => {
          return <Crumb path={path} hasDelimiter={index < lastItemIndex} key={path}/>
        })}
      </ul>
    )
  }
}

export default BreadCrumbs
