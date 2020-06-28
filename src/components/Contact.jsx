import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

const countries = require('../common/data/countries.json');

@inject("ViewStore")
@observer
class Contact extends Component {
    render() {
        return (
            <div>
                {this.props.ViewStore.showContact 
                ? <div className="contact-form">
                    <div className="contact-title h3 text-center">Contact our dealer</div>
                    <form className="inputs">
                        <div className="id">
                            <span className="h5">Vehicle ID: </span>
                            <span>{this.props.ViewStore.vehicleObject.id}</span>
                        </div>
                        <div className="name d-flex mx-10 my-3">
                            <div className="first-name ml-10">
                                <input type="text" placeholder="First name" name="first-name" required />
                            </div>
                            <div className="last-name mr-10">
                                <input type="text" placeholder="Last name" name="last-name" required />
                            </div>
                        </div>
                        <div className="contact-info d-flex mx-10 my-3">
                            <div className="phone ml-10">
                                <input type="text" placeholder="Personal phone" name="personal-phone" required />
                            </div>
                            <div className="email mr-10">
                                <input type="email" placeholder="E-mail" name="email" required />
                            </div>
                        </div>
                        <div className="country-info d-flex mx-10 my-3" name="country">
                            <div className="country ml-10">
                                <select required>
                                    {countries.map((country, key) => {
                                        return <option value={country.code} key={key}>{country.name}</option>
                                    })}
                                </select>
                            </div>
                            <div className="state-info mr-10">
                                <input type="text" placeholder="State" name="state" required />
                            </div>
                        </div>
                        <div className="address-info d-flex mx-10 my-3">
                            <div className="address ml-10">
                                <input type="text" placeholder="Street address" name="address" required />
                            </div>
                            <div className="city mx-5">
                                <input type="text" placeholder="City" name="city" required />
                            </div>
                            <div className="zip-code mr-10">
                                <input type="number" placeholder="Zip code" name="zip-code" required />
                            </div>
                        </div>
                        <input type="submit" className="btn btn-blue btn-squared width-full" value="Send" />
                    </form>
                  </div>
                : <button className="btn btn-blue btn-squared width-full my-6" onClick={() => {this.props.ViewStore.clickContact()}}>Contact our dealer</button>
                }
            </div>
        );
    }
}

export default Contact;