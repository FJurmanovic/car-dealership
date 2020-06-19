import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom'

import { observer, inject } from 'mobx-react';

@inject("VehicleStore")
@observer
class VehicleList extends Component {
    render() {
        const {vehicleMake, vehicleModel, vehicleList, vehicleTransmission, vehicleEngine, vehicleBody} = this.props.VehicleStore
        return (
            <>
                {vehicleList.map(vehicle => {
                        const title = `${vehicleMake[vehicleModel[vehicle.modelId].makeId].name} ${vehicleModel[vehicle.modelId].name} ${vehicle.year}`;
                        return (
                            <Fragment key={vehicle.id}>
                                <div className="vehicle-card">
                                    <div className="vehicle-card-image"></div>
                                    <div className="vehicle-card-info">
                                        <div className="upper-info">
                                            <span className="title --full">
                                                <span data={title}>{title}</span>
                                            </span>
                                            <span className="price">{vehicle.price}€</span>
                                        </div>
                                        <div className="hidden-info">
                                            <div className="middle-info">
                                                <span>{vehicleBody[vehicle.bodyId].name}</span>
                                                <span>{vehicleEngine[vehicle.engineId].name}</span>
                                                <span>{vehicleTransmission[vehicle.transmissionId].name}</span>
                                            </div>
                                            <div className="lower-info">
                                                <Link to={`vehicle/${vehicle.id}`} className="btn btn-squared btn-blue width-full">More</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        )
                })}
            </>
        );
    }
}

export default VehicleList;