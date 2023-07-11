import axios from "axios";

// create instance of axios
const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  timeout: 1000,
});

// handle request
instance.interceptors.request.use(
  (config) => {
    // handle successful request here
    return config;
  },
  (error) => {
    // handle error requests here
    return Promise.reject(error);
  }
);

// handle response
instance.interceptors.response.use(
  (response) => {
    // handle successful response here
    return response;
  },
  (error) => {
    // handle error requests here

    // handle not found error
    if (error.response.status === 404) {
      error.response.data = {
        message: "Not found",
      };
    }

    // handle unauthorized error
    if (error.response.status === 401) {
      error.response.data = {
        message: "Unauthorized",
      };
    }

    // handle forbidden error
    if (error.response.status === 403) {
      error.response.data = {
        message: "Forbidden",
      };
    }

    // handle internal server error
    if (error.response.status === 500) {
      error.response.data = {
        message: "Internal server error",
      };
    }

    return Promise.reject(error);
  }
);

// export instance
export default instance;
