import axios from 'axios';
axios.defaults.withCredentials = true;

let endPoint = "http://54.169.251.138";

let userController = {};

userController.register = (data) => {
    console.log(data);
    let response = axios.post(endPoint + '/api/v1/user/register-request/', {
        username: data.username,
        password: data.password,
        email: data.email,
        phone_number: data.phone_number
    })
        .then(function (response) {
            // handle success
            return response.data
        })
        .catch(function (error) {
            // handle error
            return {
                status: 'failed',
                desc: error
            }
        })
    return response;
};

userController.logIn = (data) => {
    let response = axios.post(endPoint + '/api/v1/user/login/', {
        username: data.username,
        password: data.password
    })
        .then(function (response) {
            // handle success
            return response.data
        })
        .catch(function (error) {
            // handle error
            return {
                status: 'failed',
                desc: error
            }
        })
    return response;
}

userController.confirmAccount = (data) => {
    console.log(data);
    let response = axios.post(endPoint + '/api/v1/user/register-verify/', {
        user_token: data.user_token,
        uid: data.uid
    })
        .then(function (response) {
            // handle success
            return response.data
        })
        .catch(function (error) {
            // handle error
            return {
                status: 'failed',
                desc: error
            }
        })
    return response;
}

export default userController;