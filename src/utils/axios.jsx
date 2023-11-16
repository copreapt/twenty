import axios from "axios";

const customFetch = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true,
});

export default customFetch;