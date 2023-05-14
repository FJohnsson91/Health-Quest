import axios from 'axios';

const baseURL = `http://${window.location.hostname}:10000/api`;

export default axios.create({
    baseURL,
});