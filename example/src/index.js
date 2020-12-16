import 'core-js/fn/object/assign'
import 'core-js/fn/array/from'
import 'core-js/fn/array/is-array'
import 'core-js/fn/map'
import 'core-js/fn/set'
import React from 'react';
import { render } from 'react-dom';
import TimeLattice from '../../src/components/timeLattice';
import '../../src/assets/styles/index.css'
const App = () => (
  <div className="time-period-selector-container">
    <TimeLattice  onSelectionFinish={(items) => { console.log(items) }} />
  </div>
);
render(<App />, document.getElementById("root"));