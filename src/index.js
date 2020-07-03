import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './components';

import {VehicleStore, ViewStore, EditStore, AddStore, AddMakeStore, AddModelStore, FilterStore, MakeListStore, ModelListStore, EditMakeStore, EditModelStore, ListStore} from './stores';

import {Provider} from 'mobx-react';

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
        EditMakeStore={EditMakeStore}
        EditModelStore={EditModelStore}
        ListStore={ListStore}
    >
        <App />
    </Provider>


ReactDOM.render(<Application />, document.getElementById('app'));