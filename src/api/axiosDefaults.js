import axios from "axios";

axios.defaults.baseURL = 'https://explore-sthlm-231a49fd8022.herokuapp.com';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;