import React, { Component } from 'react'
import { createSelectable } from 'react-selectable-fast'
import cs from 'classnames';

class Item extends Component {
  render() {
    const { selectableRef, title } = this.props

    return <div className={cs('time-lattice-item', { 'not-selectable': title })} ref={selectableRef}>
      {title}
    </div>
  }
}

export default createSelectable(Item)
