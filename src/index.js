import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import VehicleStore from './stores/vehicleStore';
import ViewStore from './stores/viewStore';
import EditStore from './stores/editStore';
import AddStore from './stores/addStore';
import AddMakeStore from './stores/addMakeStore';
import AddModelStore from './stores/addModelStore';
import FilterStore from './stores/filterStore';
import MakeListStore from './stores/makeListStore';
import ModelListStore from './stores/modelListStore';

import {Provider} from 'mobx-react'

const Application = () => 
    <Provider 
        VehicleStore={VehicleStore} 
        ViewStore={ViewStore} 
        EditStore={EditStore} 
        AddStore={AddStore}
        AddMakeStore={AddMakeStore}
        AddModelStore={AddModelStore}
        FilterStore={FilterStore}
        MakeListStore={MakeListStore}
        ModelListStore={ModelListStore}
    >
        <App />
    </Provider>


ReactDOM.render(<Application />, document.getElementById('app'));