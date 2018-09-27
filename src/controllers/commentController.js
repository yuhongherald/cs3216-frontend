import axios from 'axios';
import eventController from "./eventController";

axios.defaults.withCredentials = true;

const endPoint = 'https://boredgowhere.live';

let commentController = {};

commentController.createComment = (data) => {
    console.log(data);
    let postData;
    if (data.rely_to) {
        postData = {
            eid: data.eid,
            content: data.content,
            type: data.type,
            reply_to: data.rely_to
        }
    }
    else {
        postData = {
            eid: data.eid,
            content: data.content,
            type: data.type
        }
    }

    return axios({
        url: endPoint + '/api/v1/comment/post/',
        method: 'POST',
        data: postData,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    }).then(function (response) {
        // handle success
        return response.data
    }).catch(function (error) {
        // handle error
        return {
            status: 'failed',
            desc: error
        }
    });
}

commentController.getComments = (data) => {
    return axios.get(endPoint + '/api/v1/comment/get_comments/', {
        params: data
    })
        .then(function (response) {
            // handle success
            return response.data;
        })
        .catch(function (error) {
            // handle error
            return {
                status: 'failed',
                desc: error.message
            }
        });
};


export default commentController;