import axios from 'axios';

let baseURL = '';
// Check if running in development or production environment
if (process.env.NODE_ENV === 'development') {
  // Development environment
  baseURL = 'http://localhost:10000/api';
} else {
  // Production environment
  baseURL = `${window.location.origin}/api`;
}
export default axios.create({
  baseURL,
});