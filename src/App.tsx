import { NextUIProvider } from "@nextui-org/react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { AxiosInterceptor } from "@config/axios"
import { SnackbarProvider } from "@hooks/useSnackbar"
import { Details } from "@pages/Details/Details"
import { ErrorPage } from "@pages/Error/ErrorPage"
import { Home } from "@pages/Home/Home"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/details/:symbol",
    element: <Details />,
  },
])

function App() {
  return (
    <NextUIProvider>
      <SnackbarProvider>
        <AxiosInterceptor>
          <main>
            <RouterProvider router={router} />
          </main>
        </AxiosInterceptor>
      </SnackbarProvider>
    </NextUIProvider>
  )
}

export default App
