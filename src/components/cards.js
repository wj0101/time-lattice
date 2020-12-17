import React from 'react'
import cs from 'classnames';
import { createSelectable } from 'react-selectable-fast'
import { Popover } from 'antd';
import 'antd/es/popover/style/css'; // 加载 CSS

export const Card =createSelectable(props => {
  const { selectableRef, isSelected, isSelecting,value } = props
  const generateTimePeriodExhibition = (val) => {
    let column = val.column
    let up = Math.round(column/2)
    let down = Math.floor(column / 2)
    return `${down}:${column%2 ==0 ? '00' : '30'} ~ ${up}:${column%2 ==0 ? '30' : '00'}`
  }

  return (
    <Popover content={generateTimePeriodExhibition(value)} >
      <div 
        className={cs('time-lattice-date', 
        { selected: isSelected, selecting: isSelecting})} 
        ref={selectableRef}>
          <Popover content={generateTimePeriodExhibition(value)}></Popover>
      </div>
     </Popover>
  )
})
