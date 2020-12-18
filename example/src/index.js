import 'core-js/fn/object/assign'
import 'core-js/fn/array/from'
import 'core-js/fn/array/is-array'
import 'core-js/fn/map'
import 'core-js/fn/set'
import React from 'react';
import { render } from 'react-dom';
import TimeLattice from '../../src/components/TimeLattice';
import '../../src/assets/styles/index.css'
const App = () => (
  <div className="time-lattice-container">
    <TimeLattice value={[48]} onSelectionFinish={(items) => { console.log(items) }} onChange={index => { console.log(index)}}/>
  </div>
);
render(<App />, document.getElementById("root"));