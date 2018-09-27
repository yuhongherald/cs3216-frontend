import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import Auth from '../../modules/Auth';
import "../Main/css/Index.css";
import $ from 'jquery';

const styles = {
    navbar: {
        color: 'rgb(255, 90, 95',
        paddingTop: '10px'
    }
};

class Base extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        if ($('#bs-example-navbar-collapse-1').css('display') == "block") {
            $('#bs-example-navbar-collapse-1').removeClass("in")
        }

        $('#content').click(function () {
            if ($('#bs-example-navbar-collapse-1').css('display') == "block") {
                $('#bs-example-navbar-collapse-1').removeClass("in")
            }

        });

        $('#bs-example-navbar-collapse-1').click(function () {
            if ($('#bs-example-navbar-collapse-1').css('display') == "block") {
                $('#bs-example-navbar-collapse-1').removeClass("in")
            }

        });

        $('#navbar-header').click(function () {
            if ($('#bs-example-navbar-collapse-1').css('display') == "block") {
                $('#bs-example-navbar-collapse-1').removeClass("in")
            }

        });
    }

    componentWillUnmount() {
        if ($('#bs-example-navbar-collapse-1').css('display') == "block") {
            $('#bs-example-navbar-collapse-1').removeClass("in")
        }

        $('#content').click(function () {
            if ($('#bs-example-navbar-collapse-1').css('display') == "block") {
                $('#bs-example-navbar-collapse-1').removeClass("in")
            }

        });


    }

    render() {
        const {children} = this.props;

        return (
            <div>
                <div id="navigation-header">
                    <nav className="navbar navbar-default"  style={{paddingBottom: '10px'}} role="navigation">
                        <div className="container">
                            <div className="navbar-header" id="navbar-header">
                                <button type="button" className="navbar-toggle" data-toggle="collapse"
                                        data-target="#bs-example-navbar-collapse-1">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                                <Link to="/" className="navbar-brand" style={{paddingTop: '28px', fontWeight: 'bold'}}>
                                    <span style={{color: '#FF5A5F', marginRight: '3px'}}>bored</span><span style={{color: '#000'}}>gowhere</span>
                                </Link>
                            </div>
                            <span className="pull-right search-btn"><span>
                            <Link to={`/`} style={{color: 'rgb(0, 132, 137)', paddingRight: '20px'}}> Explore</Link></span></span>

                        </div>
                        {/*Navbar, keep the logic*/}
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            {Auth.isUserAuthenticated() ? (
                                <ul className="nav navbar-nav navbar-right">
                                    <li><Link to={`/events/new`}>
                                        <button className="create-event">Create events</button>
                                    </Link></li>
                                    <li style={styles.navbar}>
                                        <Link id="navbar-user">{Auth.getUserData().username}
                                            <i className="fas fa-user" style={{display: 'inline-block', float: 'right', padding: '0px 0px', fontSize: '24px', fontWeight: 'lighter'}}></i>
                                        </Link>
                                    </li>
                                    <li><Link to={`/my-schedule`}> My schedule
                                        <i className="fas fa-calendar-alt navbar-icon light" style={{display: 'inline-block', float: 'right', padding: '0px 0px', fontSize: '24px', color: '#ddd !important'}}></i></Link></li>
                                    <li><Link to={`/manage-events`}> Manage events
                                        <i className="fas fa-map-pin navbar-icon" style={{display: 'inline-block', float: 'right', padding: '0px 0px', fontSize: '24px', color: '#ddd !important'}}></i>
                                    </Link></li>
                                    <li><Link to={`/logout`}>Log out
                                        <i className="fas fa-sign-out-alt navbar-icon" style={{display: 'inline-block', float: 'right', padding: '0px 0px', fontSize: '24px', color: '#ddd !important'}}></i>
                                    </Link></li>
                                </ul>
                            ) : (
                                <ul className="nav navbar-nav navbar-right">
                                    <li className="nav navbar-left-link"><Link to={`/login`}>Log in</Link></li>
                                    <li className="nav"><Link to={`/signup`}>Sign up</Link></li>
                                </ul>

                            )}
                        </div>
                    </nav>
                    <div id="content">
                        {children}
                    </div>
                </div>
            </div>

        )
    }
}



export default Base;