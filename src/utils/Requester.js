import axios from "axios";

const baseUrl = 'http://localhost:8080';

export const fetchActivities = () => {
    return axios.get(baseUrl + '/activities');
}

export const createRecord = (sets, reps, activityType) => {
    return axios.post(baseUrl + '/records', {sets, reps, activityType});
}

export const updateRecord = (id, sets, reps, activityType) => {
    return axios.post(baseUrl + '/records/' + id + '/update', {sets, reps, activityType});
}

export const getAllRecords = () => {
    return axios.get(baseUrl + '/records');
}

export const deleteRecord = id => {
    return axios.post(baseUrl + '/records/' + id + '/delete');
}

export const getRecord = id => {
    return axios.get(baseUrl + '/records/' + id);
}
