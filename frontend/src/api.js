import axios from "axios";

const api = axios.create({
  baseURL: REACT_APP_SERVER_URL,
});

export default api;
