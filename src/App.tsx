import { NextUIProvider } from "@nextui-org/react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { Details } from "@pages/Details/Details"
import { ErrorPage } from "@pages/Error/ErrorPage"
import { Index } from "@pages/Home/Index"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
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
      <main>
        <RouterProvider router={router} />
      </main>
    </NextUIProvider>
  )
}

export default App
