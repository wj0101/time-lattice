# time-lattice
### 7*24小时的时间选择器，支持拖拽多选

## 安装
#### yarn add react-time-lattice
#### npm i react-time-lattice

## 参数
#### items => []
#### onChange 变化时回调函数,返回选中的格子索引，可在antd Form中使用
#### onSelectionFinish  {item => {column: 0, row:0, index: 0}}
#### index为格子下标，从左到右，从上到下
#### column代表时间点，从0开始
#### row代表星期几，从0开始


## 示例
- [DEMO](https://wj0101.github.io/time-lattice.github.io/)
#### import TimeLattice from 'react-time-lattice';
#### import 'react-time-lattice/lib/main.min.css'

#### <TimeLattice onSelectionFinish={(items) => { console.log(items) }} onChange={index => { console.log(index)}}/>
