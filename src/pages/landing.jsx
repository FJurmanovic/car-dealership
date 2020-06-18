import React, { Component } from 'react'
import {Link} from 'react-router-dom'

const upperCar = require("../common/svgs/upper-car.svg")
const car1 = require("../common/svgs/car1.svg")
const car2 = require("../common/svgs/car2.svg")

class Landing extends Component {
    render() {
        return (
            <div className="landing text-center d-flex flex-justify-center flex-items-center full-height bg-gray-darker">
                <div>
                    <div className="title-text text-uppercase t-yellow my-5">Car Dealership</div>
                    <div className="car-logo"><img src={upperCar} /></div>
                    <div className="slogan-text text-white my-5">We offer best deals for your four wheels</div>
                    <Link to="/explore" className="button-explore btn btn-rounder btn-white px-12 py-4 my-5">Explore</Link>
                </div>
                <div className="car-vectors">
                    <div className="car1"><img src={car1} /></div>
                    <div className="car2"><img src={car2} /></div>
                </div>
            </div>
        )
    }
}

export default Landing;
