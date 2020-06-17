import React, { Component } from 'react';
import {observer} from 'mobx-react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import './app.scss'

import Header from '../../layouts/header'

import Landing from '../../pages/landing'
import Explore from '../../pages/explore'

@observer
class App extends Component {
    render() {
        return(
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Landing />
                    </Route>
                    <Route path="/explore">
                        <Header />
                        <Explore store={this.props.store} />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default App;