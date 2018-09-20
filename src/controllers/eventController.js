import axios from 'axios';

axios.defaults.withCredentials = true;

const endPoint = 'http://54.169.251.138';

let eventController = {};

eventController.getEvents = (data) => {
    let response = axios.get(endPoint + '/api/v1/event/list/', {
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
    return response;
};

eventController.getEvent = (data) => {
    let response = axios.get(endPoint + '/api/v1/event/get_event/', {
        params: data
    })
        .then(function (response) {
            // handle success
            return response.data
        })
        .catch(function (error) {
            // handle error
            return {
                status: 'failed',
                desc: error.message
            }
        });
    return response;
};

eventController.createEvent = (data) => {
    console.log(data);
    let formData = new FormData();
    formData.append('event_title', data.event_title);
    formData.append('event_desc', data.event_desc);
    formData.append('max_quota', data.max_quota);
    formData.append('event_type', data.event_type);
    formData.append('event_start_date', data.event_start_date);
    formData.append('event_end_date', data.event_end_date);
    formData.append('is_open_ended', data.is_open_ended);
    formData.append('postal_code', data.postal_code);
    formData.append('image', data.image);
    console.log(formData);
    let response = axios({
        url: endPoint + '/api/v1/event/create_event/',
        method: 'POST',
        data: formData,
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
    return response;
};

eventController.participateEvent = (data) => {
    console.log(data);
    let response = axios.post(endPoint + '/api/v1/event/participate/', {
        eid: data.eid,
        op_type: data.op_type
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
        });

    return response;
};

eventController.getNearbyEvents = (data) => {
    return axios.get(endPoint + '/api/v1/event/nearby/', {
        params: data
    })
        .then(response => {
            return response;
        })

        .catch(err => {
        return {
            status: 'failed',
            desc: err
        }
    });
};

eventController.getParticipants = (data) => {
    return axios.get(endPoint + '/api/v1/event/participators/', {
        params: data
    })
        .then(response => {
            return response.data;
        })

        .catch(err => {
            return {
                status: 'failed',
                desc: err
            }
        });
}

eventController.getClickRecords = (data) => {
   return axios.post(endPoint + '/api/v1/event/history_record/', {
        eid: data.eid
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
        });
}


export default eventController;