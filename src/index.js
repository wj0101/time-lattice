import React from 'react';
import TimeLattice from './components/timeLattice';

class App extends React.Component {
  render() {
    return (
      <div className="time-lattice-container">
        <TimeLattice {...this.props} />
      </div>
    )
  }
}
export default App;