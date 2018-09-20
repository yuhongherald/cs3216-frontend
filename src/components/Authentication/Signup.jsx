import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import TextField from '@material-ui/core/TextField';
import './css/Login.css';
import userController from "../../controllers/userController";
import Modal from 'react-responsive-modal';
import {browserHistory} from 'react-router';


class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: '',
                username: '',
                phone_number: '',
                email: '',
                password: ''

            },
            user_token: '',
            uid: '',
            openTokenModal: false,
            error: false,
            isVerified: false,
            isRegistered: false
        }
        this.onChange = this.onChange.bind(this);
        this.signUp = this.signUp.bind(this);
        this.onOpenTokenModal = this.onOpenTokenModal.bind(this);
        this.onCloseTokenModal = this.onCloseTokenModal.bind(this);
        this.verify = this.verify.bind(this);
        this.onChangeToken = this.onChangeToken.bind(this);
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

    onChangeToken(event) {
        event.preventDefault();
        this.setState({
            user_token: event.target.value
        });
    }

    signUp() {
        let postData = this.state.user;
        console.log(postData);
        userController.register(postData).then(response => {
            if (response.status === 'success') {
                this.setState({
                    openTokenModal: true,
                    isRegistered: true,
                    uid: response.uid
                });

            }
            else {
                this.setState({
                    error: response.desc
                });
            }
        });
    }

    verify() {
        let postData = {
            user_token: this.state.user_token,
            uid: this.state.uid.toString()
        }
        userController.confirmAccount(postData).then(response => {
            if (response.status === 'success') {
                this.setState({
                    isVerified: true,
                    openTokenModal: false
                });

                // Redirect to login after 3 seconds
                setTimeout(browserHistory.push('/login'), 3000);
            }
            else {
                this.setState({
                    error: response.desc
                });
            }
        });
    }

    onOpenTokenModal() {
        this.setState({openTokenModal: true});
    }

    onCloseTokenModal() {
        this.setState({openTokenModal: true});
    }


    componentWillMount() {

    }


    render() {
        if (this.state.error && !this.state.isRegistered) {
            return (
                <div>{this.state.error}</div>
            )
        }
        else if(this.state.isVerified) {
            return (
                <div><h2>You have successfully registered. You can now sign in</h2></div>
            )
        }
        else {
            return (
                <div>
                    <Modal open={this.state.openTokenModal} onClose={this.onCloseTokenModal} center
                           className="popup centred">

                        <p>Please key in the registration code sent to your mobile number</p>
                        <form>
                            <div className="field-line">
                                <TextField
                                    type="text"
                                    name="user_token"
                                    onChange={this.onChangeToken}
                                    value={this.state.user_token}
                                />
                            </div>

                            <div className="u-form-group">
                                <button type="button" onClick={this.verify}>Verify</button>
                            </div>

                        </form>

                        {
                            this.state.error && this.state.isRegistered ? (
                                <div>{this.state.error}</div>
                            ) : (
                                <div></div>
                            )
                        }
                    </Modal>
                    <div className = "login-box" >
                        <div className="lb-header" style={{width: '100%', display: 'flex', flexDirection: 'row'}}>
                            <Link to="/login"  id="login-box-link" style={{'textAlign': 'left', width: '35%'}}>Login</Link>
                            <Link to="/signup" className="active" id="signup-box-link" style={{'textAlign': 'left', width: '50%'}}>Sign Up</Link>
                         </div>
                        <form className="email-login">
                            <h2 className="card-heading" style={{textAlign: 'left', paddingLeft: '20px', color: 'rgb(255, 90, 95)'}}>Sign up</h2>
                            <div className="field-line">
                                <TextField
                                    label="Full Name"
                                    name="name"
                                    onChange={this.onChange}
                                    value={this.state.user.name}
                                />
                            </div>

                            <div className="field-line">
                                <TextField
                                    label="Phone number"
                                    name="phone_number"
                                    onChange={this.onChange}
                                    value={this.state.user.phone_number}
                                />
                            </div>

                            <div className="field-line">
                                <TextField
                                    label="Username"
                                    name="username"
                                    onChange={this.onChange}
                                    value={this.state.user.username}
                                />
                            </div>

                            <div className="field-line">
                                <TextField
                                    label="Email"
                                    name="email"
                                    onChange={this.onChange}
                                    value={this.state.user.email}
                                />
                            </div>

                            <div className="field-line">
                                <TextField
                                    label="Password"
                                    type="password"
                                    name="password"
                                    onChange={this.onChange}
                                    value={this.state.user.password}
                                />
                            </div>

                            <div className="u-form-group">
                                <button type="button" onClick={this.signUp}>Sign Up</button>
                            </div>

                            <div className="u-form-group">
                                <p>Already have an account? <Link to={'/login'}>Log in</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }

    }

}

export default Signup;