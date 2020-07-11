import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import './App.scss';

import {Header} from '../layouts';

import {Toasts} from './';

import {LandingPage, ExplorePage, InfoPage, EditPage, AddPage, MakePage, ModelPage, AddMakePage, AddModelPage} from '../pages';

@inject("VehicleStore")
@observer
class App extends Component {
    componentWillMount() {
        this.props.VehicleStore.getVehicleMake();
        this.props.VehicleStore.getVehicleModel();
    }

    render() {
        return(
            <Router>
                <Toasts />
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