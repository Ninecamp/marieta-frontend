import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://marieta-express-backend-1.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;

// baseURL: "http://localhost:5001"