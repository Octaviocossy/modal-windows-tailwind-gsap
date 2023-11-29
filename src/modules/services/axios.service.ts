import _axios from "axios";

const axios = _axios.create({
  baseURL: `${process.env.API_URL}/api`,
});

export default axios;
