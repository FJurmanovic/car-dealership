import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import VehicleStore from './stores/vehicleStore';

import {Provider} from 'mobx-react'

const Application = () => 
    <Provider VehicleStore={VehicleStore}>
        <App />
    </Provider>


ReactDOM.render(<Application />, document.getElementById('app'));