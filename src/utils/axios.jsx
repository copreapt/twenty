import axios from "axios";

const customFetch = axios.create({
  baseURL: "https://twenty-myserver.onrender.com/api/v1",
});

export default customFetch;