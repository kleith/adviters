import { useEffect } from "react"

import Twelvedata from "../Home/services/Twelvedata"

export const Details = () => {
  useEffect(() => {
    const controller = new AbortController()
    // setIsLoading(true)

    async function getActions() {
      const actions = await Twelvedata.getStockBySymbol("NFLX", controller)
      // setIsLoading(false)

      // setStocks(actions.data.data)
    }
    getActions()

    return () => {
      controller.abort()
    }
  }, [])

  return (
    <>
      <h1>Details view</h1>
    </>
  )
}
