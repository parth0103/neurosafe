import axios from 'axios';
// export default AxiosFetcher = {};
const instance = axios.create({
  baseURL: 'http://localhost:4000',
});

export default api = instance;
// AxiosFetcher.get = (url, callback, errorCallback) => {
//   instance
//     .get(url)
//     .then((data) => callback(data))
//     .catch((data) => errorCallback(data));
// };
