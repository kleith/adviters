import axios from "axios"

const http = axios.create({
  baseURL: import.meta.env.VITE_API,
  timeout: 5000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
  },
})

http.interceptors.response.use(
  (response) => {
    console.log(response)

    return response
  },
  (error) => {
    console.log(error)

    return Promise.reject(error)
  },
)

export default http
