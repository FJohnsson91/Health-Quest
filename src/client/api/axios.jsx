import axios from 'axios';

const baseURL = `https://${window.location.hostname}:10000/api`;

export default axios.create({
    baseURL,
});