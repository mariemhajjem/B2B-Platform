import axios from "axios";

const env = process.env.NODE_ENV;
let url = "";

if (env == "development") {
  url = "http://localhost:8000/api/";
} else if (env == "production") {
  url = "https://app/api/";
}

const axiosInstance = axios.create({
  baseURL: url,
  timeout: 10000,
  header: {
    "Content-Type": "application/json"
  }
});

export default axiosInstance;