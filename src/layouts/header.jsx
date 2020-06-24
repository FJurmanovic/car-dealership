import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom'

class Header extends Component {
    render() {
        return (
            <header className="header border-bottom border-black p-5 f4">
                <div className="header-item--full">
                    <Link to="/" className="btn btn-link t-yellow text-uppercase h3">Car Dealership</Link>
                </div>
                <div className="header-item">
                    <Link to="/add" className="btn btn-rounder btn-default">Add</Link>
                </div>
                <div className="header-item">
                    {this.props.match.path == "/explore" 
                    ? <Link to="/manufacturers" className="btn btn-rounder btn-white">Manufacturers</Link>
                    : <Link to="/explore" className="btn btn-rounder btn-white">Explore</Link>
                    }
                </div>
            </header>
        )
    }
}

export default withRouter(Header)