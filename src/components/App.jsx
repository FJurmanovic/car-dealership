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
import MakePage from '../pages/makePage'
import ModelPage from '../pages/modelPage'
import AddMakePage from '../pages/addMakePage'
import AddModelPage from '../pages/addModelPage'

@inject("VehicleStore")
@observer
class App extends Component {
    componentWillMount() {
        this.props.VehicleStore.getVehicleList()
        this.props.VehicleStore.getVehicleMake()
        this.props.VehicleStore.getVehicleModel()
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
                    <Route path="/manufacturers/new">
                        <Header />
                        <AddMakePage />
                    </Route>
                    <Route path="/manufacturers/:makeId/new">
                        <Header />
                        <AddModelPage />
                    </Route>
                    <Route path="/manufacturers/:makeId/edit">
                        <Header />
                        <MakePage />
                    </Route>
                    <Route path="/manufacturers/:makeId/:modelId/edit">
                        <Header />
                        <ModelPage />
                    </Route>
                    <Route path="/manufacturers/:makeId/:modelId">
                        <Redirect to="/manufacturers" />
                    </Route>
                    <Route path="/manufacturers/:makeId">
                        <Header />
                        <ModelPage />
                    </Route>
                    <Route path="/manufacturers">
                        <Header />
                        <MakePage />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default App;