import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import Auth from '../../modules/Auth';
import "../Main/css/Index.css";

const styles = {
    navbar: {
        color: '#FF5A5F',
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
                            <div className="navbar-header">
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
                            <Link to={`/`} style={{color: 'rgb(0, 132, 137)', paddingRight: '20px'}}> Browse</Link></span></span>

                        </div>
                        {/*Navbar, keep the logic*/}
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            {Auth.isUserAuthenticated() ? (
                                <ul className="nav navbar-nav navbar-right">
                                    <li style={styles.navbar}>
                                        <i className="fas fa-user" aria-hidden="true"></i>
                                        {Auth.getUserData().username}
                                    </li>
                                    <li><Link to={`/my-schedule`}> My schedule</Link></li>
                                    <li><Link to={`/manage-events`}> Manage events</Link></li>
                                    <li><Link to={`/events/new`}>
                                        <button className="create-event">Create events</button>
                                    </Link></li>
                                    <li><Link to={`/logout`}>Log out</Link></li>
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