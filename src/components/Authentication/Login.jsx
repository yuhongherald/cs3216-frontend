import React from 'react';
import './css/Login.css';
import TextField from '@material-ui/core/TextField';
import Auth from '../../modules/Auth';
import {browserHistory, Link} from 'react-router';
import userController from '../../controllers/userController.js';
import {hashHistory} from 'react-router';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                'username': '',
                'password': ''
            },
            isSignIn: false,
            error: false
        };
        this.getAuth = this.getAuth.bind(this);
        this.onChange = this.onChange.bind(this);
    }


    getAuth() {
        let postData = this.state.user;
        userController.logIn(postData).then(response => {
            if (response.status == 'success') {
                this.setState({
                    user: {
                        username: response.username,
                        password: response.password,
                        uid: response.uid
                    },
                    isSignIn: true
                });
                Auth.authenticateUser(this.state.user);
                if (this.props.location.state.from === '/signup') {
                    browserHistory.push('/');
                }
                else {
                    hashHistory.goBack();
                }
            }
            else {
                this.setState({
                    error: response.desc
                });
            }
        });
    }

    onChange(event) {
        event.preventDefault();
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;
        this.setState({
            user: user
        });
    }


    componentDidMount() {
    }

    componentWillMount() {
    }


    render() {

        return (
            <div>
                <div className="login-box">
                    <div className="lb-header" style={{width: '100%', display: 'flex', flexDirection: 'row'}}>
                        <Link to="/login" className="active" id="login-box-link"
                              style={{'textAlign': 'left', width: '35%'}}>Login</Link>
                        <Link to="/signup" id="signup-box-link" style={{'textAlign': 'left', width: '50%'}}>Sign
                            Up</Link>
                    </div>
                    <h2 style={{textAlign: 'left', 'padding-left': '20px', 'color': 'rgb(255, 90, 95)', margin: '40px 0px 40px 0px'}}>Please log
                        in</h2>


                    <form className="email-login">
                        <div className="field-line">
                            <TextField className="u-form-group"
                                       label="Username"
                                       name="username"
                                       value={this.state.user.username}
                                       onChange={this.onChange}
                            />
                        </div>

                        <div className="field-line">
                            <TextField className="u-form-group"
                                       label="Password"
                                       type="password"
                                       name="password"
                                       value={this.state.user.password}
                                       onChange={this.onChange}
                            />
                        </div>

                        <div className="u-form-group">
                            <button type="button" onClick={this.getAuth}>Log in</button>
                        </div>


                        {/*<div className="u-form-group">*/}
                        {/*<a href="#" className="forgot-password">Forgot password?</a>*/}
                        {/*</div>*/}

                    </form>

                    {this.state.error ? (
                        <div style={{color: 'red'}}>{this.state.error}</div>
                    ) : (
                        <div></div>
                    )}

                </div>
            </div>
        )
    }
}

export default Login;

