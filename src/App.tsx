import { NextUIProvider } from "@nextui-org/react"

import { Index } from "./pages/Home/Index"

function App() {
  return (
    <>
      <NextUIProvider>
        <Index />
      </NextUIProvider>
    </>
  )
}

export default App
