import http from "@config/axios"

export interface Stock {
  symbol: string
  name: string
  currency: string
  exchange: string
  mic_code: string
  country: string
  type: string
}

export interface TimeSeries {
  close: string
  datetime: string
  high: string
  low: string
  open: string
  volume: string
}

interface GetStocksReponse {
  data: Stock[]
}

interface GetStockResponse {
  data: Stock[]
}

interface GetTimeSeriesResponse {
  meta: Stock
  status: string
  values: TimeSeries[]
}

export enum Interval {
  "1min" = "1min",
  "5min" = "5min",
  "15min" = "15min",
}

export const getStocks = (signal: AbortSignal) => {
  return http.get<GetStocksReponse>("stocks", {
    params: {
      exchange: "NYSE",
    },
    signal,
  })
}

export const getStockBySymbol = (symbol: string, signal?: AbortSignal) => {
  return http.get<GetStockResponse>("stocks", {
    params: {
      exchange: "NYSE",
      symbol,
    },
    signal,
  })
}

type TimeSeriesProps = { symbol: string; interval: Interval }

export const getTimeSeries = ({ symbol, interval }: TimeSeriesProps, signal?: AbortSignal) => {
  return http.get<GetTimeSeriesResponse>("time_series", {
    params: {
      apikey: import.meta.env.VITE_APIKEY,
      date: "today",
      symbol,
      interval,
    },
    signal,
  })
}

type TimeSeriesBetweenProps = {
  start_date: string
  end_date: string
} & TimeSeriesProps

export const getTimeSeriesBetween = (
  { symbol, interval, start_date, end_date }: TimeSeriesBetweenProps,
  signal?: AbortSignal,
) => {
  return http.get<GetTimeSeriesResponse>("time_series", {
    params: {
      apikey: import.meta.env.VITE_APIKEY,
      symbol,
      interval,
      start_date,
      end_date,
    },
    signal,
  })
}
