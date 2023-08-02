import axios from "axios";

axios.defaults.baseURL = 'https://explore-sthlm-ffc7a7853efc.herokuapp.com';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

/* axios interceptors, request and response */
export const axiosReq = axios.create();
export const axiosRes = axios.create();