import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION as string;
const API_CLIENT_ID = process.env.REACT_APP_API_CLIENT_ID;

axios.defaults.baseURL = API_URL;
axios.defaults.headers.common = {
  Accept: 'application/json, application/xml, text/play, text/html, *.*',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Accept-Version': API_VERSION,
  Authorization: `Client-ID ${API_CLIENT_ID}`,
};

export const httpClient = axios.create();

export default axios;
