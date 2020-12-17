import React, { Component, Fragment,memo } from 'react'
import { DeselectAll } from 'react-selectable-fast'
import Item from '../Item/Item';

const List = memo(props => {
  const { hourList,items,tips } = props

  const generateDay = () => {
    const days = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
    return days.map(day => {
      return (<div key={day} className="time-lattice-day">{day}</div>)
    })
  }

  return <Fragment>
    <div className="warpper-date">
      <div className="time-lattice-day-wrapper">
        {generateDay()}
      </div>
      <div className="date-time-list">
        <div className="time-lattice-wrapper">
          {hourList && hourList.map((item, i) => (
            <div className='time-lattice-item not-selectable' key={item.title}>
            {item.title}
          </div>
          ))}
        </div>
        <div className="time-lattice-wrapper">
          {items && items.map((item, i) => (
            <Item
              key={i}
              value={item}
              isSelected={item.isSelected}
            />
          ))}
        </div>
      </div>
    </div>
    <div className="time-lattice-button-wrapper not-selectable">
      <span className="time-lattice-tips">{tips}</span>
      <DeselectAll className="time-lattice-button">
        <div className="text">清除</div>
      </DeselectAll>
    </div>
  </Fragment>
});


export default List

