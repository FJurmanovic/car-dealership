import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import './app.scss'

import Header from '../../layouts/header'

import Landing from '../../pages/landing'
import Explore from '../../pages/explore'
import CarInformation from '../../pages/carInformation'

@inject("VehicleStore")
@observer
class App extends Component {
    componentDidMount() {
        this.props.VehicleStore.getVehicleList()
    }

    render() {
        return(
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Landing />
                    </Route>
                    <Route path="/explore">
                        <Header />
                        <Explore />
                    </Route>
                    <Route path="/vehicle/:vehicleId">
                        <Header />
                        <CarInformation />
                    </Route>
                    <Route path="/vehicle">
                        <Redirect to="/explore" />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default App;