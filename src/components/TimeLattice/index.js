import React, { Component, Fragment,memo } from 'react'
import { SelectableGroup } from 'react-selectable-fast'
import List from '../List/List'
import { deepClone } from '../../utils'
require('../../assets/styles/index.css');

function prefixNum(num) {
  if (num < 10) {
    return `0${num}`;
  }
  return num;
}
class TimeLattice extends Component {
  state = {
    hourList:[],
    items:[],
    groupedData: [],
    tips: '',
    timeObj: {},
  }
  
  componentDidMount(){
    this.generateItemsHour()
    this.generateItems()
  }
  getSelectableGroupRef = (ref) => {
    window.selectableGroup = ref
  }

  handleSelectionFinish = selectedItems => {
    const arr = selectedItems.map(item => {
      return item.props.value
    })
    // 排序
    arr.sort((a, b) => {
      return a.index - b.index
    })
    let indexList = arr.map(item => item.index)
    // 分组
    const groupedData = this.arrange(arr);
    let tips;
    if (groupedData.length > 0) {
      tips = `已选择时间段`
    } else {
      tips = '拖动鼠标选择时间段'
    }   
    this.setState({
      groupedData,
      tips
    }, () => {
      this.generrateTimeObject()
    })
    this.props.onChange.call(this, indexList)

  }
  arrange = (source) => {
    let t;
    let ta;
    let r = [];

    for (let j = 0; j < source.length; j++) {
      let v = source[j];
      if (v != null) {
        if (t === v['column']) {
          ta.push(v);
          t++;
          continue;
        }
        ta = [v];
        t = v['column'] + 1;
        r.push(ta);
      }
    }
    return r;
  }

    // 生成展示
  generateTimePeriodExhibition = () => {
    return Object.keys(this.state.timeObj).map((key, i) => {
      return (
        <p key={i} className="time-lattice-ex"><span className="time-lattice-time">{key}</span>{this.generateTime(this.state.timeObj[key])}</p>
      )
    })
  }

  // 生成每个时间段展示
  generateTime = (source) => {
    return source.map(item => {
      let column = item[item.length - 1].column
      let up = Math.round(column/2)
      let down = Math.floor(item[0].column / 2)
      return `${prefixNum(down)}:${item[0].column%2 ==0 ? '00' : '30'} ~ ${prefixNum(up)}:${column%2 ==0 ? '30' : '00'};\xa0\xa0`
    })
  }
  generateItemsHour = () => {
    let arr = [];
    let row = -2;
    for (let i = 0; i <24; i++) {
      let data = {}
      // 生成小时框显示
      if (i < 25) {
        if (i < 10) {
          data.title = `0${i}`;
        } else {
          data.title = i;
        }
      }
      // aaa代表星期几， 从0开始， 0-星期一
      if (i % 24 === 0) {
        row++
      }
      data.row = row;

      // 时间点 0-24
      data.column = i % 24;

      // 下标
      data.index = i;

      arr.push(data);
    }
    this.setState({
      hourList:arr
    })
  }
  generateItems = () => {
    let arr = [];
    let row = -1;
    let selectedItems = [];
    for (let i = 0; i < 7 * 48; i++) {
      let data = {}

      // aaa代表星期几， 从0开始， 0-星期一
      if (i % 48 === 0) {
        row++
      }
      data.row = row;

      // 时间点 0-24
      data.column = i % 48;

      // 下标
      data.index = i;

      // 设置默认选中
      if (this.props.defaultSelected && this.props.defaultSelected.includes(i)) {
        data.isSelected = true;
        selectedItems.push({ props: { value: data } });
      }

      arr.push(data);
    }
    this.setState({
      items: arr
    })
    this.handleSelectionFinish(selectedItems);
  } 
  // 生成时间对象
  generrateTimeObject = () => {
    const timeObj = {}
    this.state.groupedData.forEach(item => {
      if (item && item.length > 0) {
        switch (item[0].row) {
          case 0:
            if (!timeObj['星期一']) {
              timeObj['星期一'] = [];
            }
            timeObj['星期一'].push(item);
            break;
          case 1:
            if (!timeObj['星期二']) {
              timeObj['星期二'] = [];
            }
            timeObj['星期二'].push(item);
            break;
          case 2:
            if (!timeObj['星期三']) {
              timeObj['星期三'] = [];
            }
            timeObj['星期三'].push(item);
            break;
          case 3:
            if (!timeObj['星期四']) {
              timeObj['星期四'] = [];
            }
            timeObj['星期四'].push(item);
            break;
          case 4:
            if (!timeObj['星期五']) {
              timeObj['星期五'] = [];
            }
            timeObj['星期五'].push(item);
            break;
          case 5:
            if (!timeObj['星期六']) {
              timeObj['星期六'] = [];
            }
            timeObj['星期六'].push(item);
            break;
          case 6:
            if (!timeObj['星期日']) {
              timeObj['星期日'] = [];
            }
            timeObj['星期日'].push(item);
            break;
        }
      }
    })
    this.setState({
      timeObj
    })

    if (this.props.onSelectionFinish) {
      const propsObj = deepClone(timeObj);
      Object.keys(propsObj).forEach(key => {
        propsObj[key].map(arr => {
          return arr.map(item => {
            delete item.isSelected
            item.index = item.index - 25
            return item
          })
        })
      })
      this.props.onSelectionFinish.call(this, propsObj)
    }
  }
  render() {
    const { hourList, items, tips } = this.state
    return (
      <Fragment>
        <div className="time-lattice-title-wrapper">
          <div className="time-date-title-name">星期/时间</div>
          <div className="time-lattice-title">00:00-12:00</div>
          <div className="time-lattice-title">12:00-24:00</div>
        </div>
         <SelectableGroup
            ref={this.getSelectableGroupRef}
            enableDeselect
            tolerance={0}
            allowClickWithoutSelected={true}
            onSelectionFinish={this.handleSelectionFinish}
            ignoreList={['.not-selectable']}
          >
            <List hourList={hourList} items={items} tips={tips}/>
          </SelectableGroup>
        {this.generateTimePeriodExhibition()}
      </Fragment>
    )
  }
}

export default TimeLattice
