import axios from "axios";

const customFetch = axios.create({
  baseURL: "https://twenty-myserver.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default customFetch;