import React, { Component } from 'react'
import { createSelectable } from 'react-selectable-fast'
import cs from 'classnames';
import { Popover } from 'antd';
import 'antd/es/popover/style/css'; // 加载 CSS

class Item extends Component {
  generateTimePeriodExhibition = (val) => {
    let column = val.column
    let up = Math.round(column/2)
    let down = Math.floor(column / 2)
    return `${down}:${column%2 ==0 ? '00' : '30'} ~ ${up}:${column%2 ==0 ? '30' : '00'}`
  }
  render() {
    const { selectableRef, isSelected, isSelecting,value } = this.props

    return <Popover content={this.generateTimePeriodExhibition(value)}>
          <div 
            className={cs('time-period-selector-date', 
            { selected: isSelected, selecting: isSelecting, 'not-selectable': this.props.title })} 
            ref={selectableRef}>
          </div>
    </Popover>

  }
}

export default createSelectable(Item)
