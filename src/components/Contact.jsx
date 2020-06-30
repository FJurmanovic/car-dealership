import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

const countries = require('../common/data/countries.json');



@inject("ViewStore")
@observer
class Contact extends Component {
    constructor(props){
        super(props);
        this.hooks = {
            onSuccess() {
                alert("You successfully contacted our dealer. Please wait until we review your form.");
                props.history.push("/explore");
            }
        }
    }

    render() {
        const {form} = this.props;
        return (
            <div>
                {this.props.ViewStore.showContact 
                ? <div className="contact-form">
                    <div className="contact-title h3 text-center">Contact our dealer</div>
                    <form className="inputs" onSubmit={e => form.onSubmit(e, {onSuccess: this.hooks.onSuccess})}>
                        <div className="id">
                            <span className="h5">Vehicle ID: </span>
                            <span>{this.props.ViewStore.vehicleObject.id}</span>
                        </div>
                        <div className="name d-flex mx-10 my-3">
                            <div className="first-name ml-10">
                                <input {...form.$("first_name").bind()} />
                                {form.$("first_name").error && <small className="h5 text-red d-block">First name is required</small>}
                            </div>
                            <div className="last-name mr-10">
                                <input {...form.$("last_name").bind()} />
                                {form.$("last_name").error && <small className="h5 text-red d-block">Last name is required</small>}
                            </div>
                        </div>
                        <div className="contact-info d-flex mx-10 my-3">
                            <div className="phone ml-10">
                                <input {...form.$("phone").bind()}d />
                                {form.$("phone").error && <small className="h5 text-red d-block">Personal phone is required</small>}
                            </div>
                            <div className="email mr-10">
                                <input {...form.$("email").bind()} />
                                {form.$("email").error && <small className="h5 text-red d-block">E-mail is required</small>}
                            </div>
                        </div>
                        <div className="country-info d-flex mx-10 my-3" name="country">
                            <div className="country ml-10">
                                <select {...form.$("country").bind()}>
                                    {countries.map((country, key) => {
                                        return <option value={country.code} key={key}>{country.name}</option>
                                    })}
                                </select>
                                {form.$("country").error && <small className="h5 text-red d-block">Country is required</small>}
                            </div>
                            <div className="state-info mr-10">
                                <input {...form.$("state").bind()} />
                                {form.$("state").error && <small className="h5 text-red d-block">State is required</small>}
                            </div>
                        </div>
                        <div className="address-info d-flex mx-10 my-3">
                            <div className="address ml-10">
                                <input {...form.$("address").bind()} />
                                {form.$("address").error && <small className="h5 text-red d-block">Address is required</small>}
                            </div>
                            <div className="city mx-5">
                                <input {...form.$("city").bind()} />
                                {form.$("city").error && <small className="h5 text-red d-block">City is required</small>}
                            </div>
                            <div className="zip-code mr-10">
                                <input {...form.$("zip").bind()} />
                                {form.$("zip").error && <small className="h5 text-red d-block">Zip code is required</small>}
                            </div>
                        </div>
                        <div className="questions mx-10 my-3">
                            <label>Questions for your dealer(optional): </label>
                            <div contentEditable className="questions-area" {...form.$("questions").bind()}></div>
                        </div>
                        <div className="text-italic">Fields with * are required</div>
                        <input type="submit" className="btn btn-blue btn-squared width-full" value="Send" />
                    </form>
                  </div>
                : <button className="btn btn-blue btn-squared width-full my-6" onClick={() => {this.props.ViewStore.clickContact()}}>Contact our dealer</button>
                }
            </div>
        );
    }
}

export default withRouter(Contact);