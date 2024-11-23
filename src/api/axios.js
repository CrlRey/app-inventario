import axios from "axios"



// const config = {
//   baseURL: `${import.meta.env.VITE_API_URL}`,
//     headers: {
//         accept: 'application/json',
//         X-Requested-With: 'XMLHttpRequest',
//       }
// }

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  headers: {
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: true
})
