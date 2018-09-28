import axios from 'axios';

axios.defaults.withCredentials = true;

const endPoint = 'https://boredgowhere.live';

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
    let formData = new FormData();
    formData.append('event_title', data.event_title);
    formData.append('event_desc', data.event_desc);
    formData.append('max_quota', data.max_quota);
    formData.append('event_type', data.event_type);
    formData.append('event_start_date', data.event_start_date);
    formData.append('event_end_date', data.event_end_date);
    formData.append('is_open_ended', data.is_open_ended);
    formData.append('address', data.address);
    formData.append('image', data.image);
    formData.append('lat', data.lat);
    formData.append('lng', data.lng);
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

eventController.getViewCounts = (data) => {
    return axios.get(endPoint + '/api/v1/event/views-count/', {
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
                desc: error
            }
        });
}

eventController.postRating = (data) => {
    return axios.post(endPoint + '/api/v1/event/rate/', {
        eid: data.eid,
        rating: data.rating
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

eventController.closeEvent = (data) => {
    return axios.post(endPoint + '/api/v1/event/close/', {
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

eventController.deleteEvent = (data) => {
    return axios.delete(endPoint + '/api/v1/event/delete/', {
        data: {
            eid: data.eid
        }
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

eventController.confirmCancel = (data) => {
    return axios.post(endPoint + '/api/v1/user/confirm_cancel/', {
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

eventController.editEvent = (data) => {
    let putData = {
        eid: data.eid,
        event_title: data.event_title,
        event_desc: data.event_desc,
        max_quota: data.max_quota,
        event_type: data.event_type,
        event_start_date: data.event_start_date,
        event_end_date: data.event_end_date,
        is_open_ended: data.is_open_ended,
        address: data.address,
        lat: data.lat,
        lng: data.lng
    };
    let response = axios({
        url: endPoint + '/api/v1/event/modify/',
        method: 'PUT',
        data: putData,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
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


export default eventController;


