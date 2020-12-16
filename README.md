# time-lattice
#### 7*24小时的时间选择器，支持拖拽多选

#### items => []

#### item => {column: 0, row:0, index: 0}

#### index为格子下标，从左到右，从上到下

#### column代表时间点，从0开始

#### row代表星期几，从0开始

#### <TimeLattice onSelectionFinish={(items) => { console.log(items) }} />