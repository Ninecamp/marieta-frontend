import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://marieta-express-backend-25c6.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;

// baseURL: "http://localhost:5001"
