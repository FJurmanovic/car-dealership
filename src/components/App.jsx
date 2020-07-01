import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import './App.scss';

import Header from '../layouts/header';

const LandingPage = React.lazy(() => import('../pages/landingPage'));
const ExplorePage = React.lazy(() => import('../pages/explorePage'));
const InfoPage = React.lazy(() => import('../pages/infoPage'));
const EditPage = React.lazy(() => import('../pages/editPage'));
const AddPage = React.lazy(() => import('../pages/addPage'));
const MakePage = React.lazy(() => import('../pages/makePage'));
const ModelPage = React.lazy(() => import('../pages/modelPage'));
const AddMakePage = React.lazy(() => import('../pages/addMakePage'));
const AddModelPage = React.lazy(() => import('../pages/addModelPage'));

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