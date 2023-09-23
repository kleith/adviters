import http from "../../../config/axios"

export interface Stocks {
  country: string
  currency: string
  exchange: string
  mic_code: string
  name: string
  symbol: string
  type: string
}

interface GetStocksReponse {
  data: Stocks[]
}

class TwelvedataService {
  public getStocks(controller: AbortController) {
    return http.get<GetStocksReponse>("stocks", {
      params: {
        source: "docs",
        exchange: "NYSE",
      },
      signal: controller.signal,
    })
  }

  public getStockBySymbol(symbol: string, controller: AbortController) {
    return http.get<GetStocksReponse>("stocks", {
      params: {
        source: "docs",
        symbol,
      },
      signal: controller.signal,
    })
  }
}

export default new TwelvedataService()
