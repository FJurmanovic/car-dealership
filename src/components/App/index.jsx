import React, { Component } from 'react';
import {observer} from 'mobx-react';

@observer
class App extends Component {
    render() {
        const {vehicleMake} = this.props.store
        return(<h1>{vehicleMake[0]}!</h1>);
    }
}

export default App;