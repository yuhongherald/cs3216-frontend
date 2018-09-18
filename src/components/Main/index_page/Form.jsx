import {Component} from "react";
import {ReactDatez} from "react-datez";
import Dropdown from "react-dropdown";
import React from "react";
import * as PropTypes from "prop-types";


class Form extends Component {
    render() {
        return <div style={{padding: "20px 20px"}}>
            <div className="_ovebx1" style={{backgroundColor: "transparent"}}>
                <div className="_slilk2">
                    <form id="MagicCarpetSearchBar">
                        <div>
                            <div>
                                <div>
                                    <div className="_fhlaevk" style={{width: "130px"}} onClick={this.props.onClick}>
                                        <p style={{
                                            backgroundColor: "rgb(255, 90, 95)",
                                            padding: "5px 0px 5px 10px",
                                            color: "white",
                                            borderRadius: "5px",
                                            border: "1px solid rgb(255, 90, 95)"
                                        }}>
                                            Reset filters
                                            <i className="fas fa-undo" style={{
                                                marginLeft: "10px",
                                                fontSize: "12px",
                                                color: "white",
                                                padding: "0px 0px"
                                            }}
                                            ></i>
                                        </p>
                                    </div>
                                    <div style={{marginBottom: "8px"}}><label className="_rin72m"
                                                                              htmlFor="magic-carpet-koan-search-bar">
                                        <small className="_fhlaevk">WHERE</small>

                                    </label></div>
                                    <input type="text" className="form-control big-form"
                                           id="formInput113" name="location"
                                           onChange={this.props.onChange}
                                           value={this.props.filters.location} required
                                           style={{marginBottom: "20px"}}
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div style={{marginTop: "30x", marginBottom: "16px"}}>

                                <div style={{marginTop: "8px", display: "flex", flexDirection: "row"}}>

                                    <div className="_1k6rf4u" style={{width: "50%"}}>
                                        <div>
                                            <div style={{marginBottom: "8px"}}><label
                                                className="_rin72m" htmlFor="checkin_input">
                                                <small className="_fhlaevk">START DATE</small>
                                            </label></div>
                                        </div>
                                        <ReactDatez name="dateInput" handleChange={this.props.handleChange}
                                                    value={this.props.value} required/>
                                    </div>
                                    <div className="_1k6rf4u" style={{width: "50%"}}>
                                        <div>
                                            <div style={{marginBottom: "8px"}}><label
                                                className="_rin72m" htmlFor="checkout_input">
                                                <small className="_fhlaevk">END DATE</small>
                                            </label></div>
                                        </div>
                                        <ReactDatez name="dateInput" handleChange={this.props.handleChange1}
                                                    value={this.props.value1} required/>
                                    </div>


                                </div>
                            </div>
                        </div>
                        <div style={{marginTop: "16px", marginBottom: "16px"}}>
                            <div>
                                <div style={{marginBottom: "8px"}}><label className="_rin72m"
                                                                          htmlFor="lp-guestpicker">
                                    <small className="_fhlaevk">CATEGORY</small>
                                </label></div>
                                <Dropdown
                                    options={this.props.options} onChange={this.props.onChange1}
                                    value={this.props.filters.category}
                                    placeholder="Select an option" required/>

                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>;
    }
}

Form.propTypes = {
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    filters: PropTypes.any,
    handleChange: PropTypes.func,
    value: PropTypes.any,
    handleChange1: PropTypes.func,
    value1: PropTypes.any,
    options: PropTypes.arrayOf(PropTypes.any),
    onChange1: PropTypes.func
};

export default Form;
