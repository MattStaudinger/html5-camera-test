import axios from "axios";

const service = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "/api"
      : "http://localhost:5000/api",
  withCredentials: true
});

const errHandler = err => {
  console.error(err);
  if (err.response && err.response.data) {
    console.error("API response", err.response.data);
    throw err.response.data.message;
  }
  throw err;
};

export default {
  service: service,

  sendPicture(image) {
    return service
      .post(`/sendPicture/`, { image })
      .then(res => res.data)
      .catch(errHandler);
  },
  addPicture(image) {
    return service
      .post(`/uploadPicture/`, { image })
      .then(res => {
        console.log(res.data);
      })
      .catch(errHandler);
  }
};
