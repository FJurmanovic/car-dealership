import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Vehicles from './stores/vehicleStore';


ReactDOM.render(<App store={Vehicles} />, document.getElementById('app'));