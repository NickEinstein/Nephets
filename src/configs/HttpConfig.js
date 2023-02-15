import axios from "axios";

console.log(process.env.REACT_APP_SOFTWORK_API);
console.log(process.env.REACT_APP_CLOUDINARY_API_URL);
export const SoftworkHttp = axios.create({
  baseURL: process.env.REACT_APP_SOFTWORK_API,
});

export const CloudinaryHttp = axios.create({
  baseURL: process.env.REACT_APP_CLOUDINARY_API_URL,
});

export default SoftworkHttp;
