import axios, { AxiosError, AxiosResponse } from "axios"
import { useEffect } from "react"

import { useSnackbar } from "@hooks/useSnackbar"

const http = axios.create({
  baseURL: import.meta.env.VITE_API,
  timeout: 5000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
  },
})

export const AxiosInterceptor: React.FC<React.PropsWithChildren> = ({ children }) => {
  const snackbar = useSnackbar()

  useEffect(() => {
    const resInterceptor = (response: AxiosResponse) => {
      console.info(`[response] [${JSON.stringify(response)}]`)

      // Si hay un error del cliente
      if (response.data.code >= 400 && response.data.code < 500) {
        snackbar?.showSnackbar(response.data.message, "error", 5)
      }

      return response
    }

    const errInterceptor = (error: AxiosError) => {
      console.error(`[response error] [${JSON.stringify(error)}]`)

      snackbar?.showSnackbar(error.message, "error", 5)

      return Promise.reject()
    }

    const interceptor = http.interceptors.response.use(resInterceptor, errInterceptor)

    return () => http.interceptors.response.eject(interceptor)
  }, [snackbar])

  return children
}

export default http
