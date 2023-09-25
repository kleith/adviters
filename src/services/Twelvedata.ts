import http from "../config/axios"

export interface Stock {
  symbol: string
  name: string
  currency: string
  exchange: string
  mic_code: string
  country: string
  type: string
}

interface GetStocksReponse {
  data: Stock[]
}

interface GetStockResponse {
  data: Stock
}

class TwelvedataService {
  public getStocks(controller: AbortController) {
    return http.get<GetStocksReponse>("stocks", {
      params: {
        exchange: "NYSE",
      },
      signal: controller.signal,
    })
  }

  public getStockBySymbol(symbol: string, controller: AbortController) {
    return http.get<GetStockResponse>("time_series", {
      params: {
        apiKey: import.meta.env.VITE_APIKEY,
        symbol,
      },
      signal: controller.signal,
    })
  }
}

export default new TwelvedataService()
