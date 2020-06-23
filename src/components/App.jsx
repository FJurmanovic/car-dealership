import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import './App.scss'

import Header from '../layouts/header'

import LandingPage from '../pages/landingPage'
import ExplorePage from '../pages/explorePage'
import InfoPage from '../pages/infoPage'
import EditPage from '../pages/editPage'
import AddPage from '../pages/addPage'

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
                        <LandingPage />
                    </Route>
                    <Route path="/explore">
                        <Header />
                        <ExplorePage />
                    </Route>
                    <Route path="/vehicle/:vehicleId/edit">
                        <Header />
                        <EditPage />
                    </Route>
                    <Route path="/vehicle/:vehicleId">
                        <Header />
                        <InfoPage />
                    </Route>
                    <Route path="/vehicle">
                        <Redirect to="/explore" />
                    </Route>
                    <Route path="/add">
                        <Header />
                        <AddPage />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default App;