import { Button, Select, SelectItem, Selection, Tab, Tabs } from "@nextui-org/react"
import { format } from "date-fns"
import { useCallback, useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"

import { Container } from "@components/Container"
import { DateInput } from "@components/DateInput"
import {
  Interval,
  Stock,
  getStockBySymbol,
  getTimeSeries,
  getTimeSeriesBetween,
} from "@services/twelvedata"

import { SelectorIcon } from "./assets/Selector"
import { Chart } from "./components/Chart"
import { Loading } from "./components/Loading"
import { NoStock } from "./components/NoStock"
import { TypeQuery } from "./Details.types"

type Points = {
  x: Date
  y: number
}

export const Details = () => {
  const params = useParams()
  const intervals = useRef<number | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)
  const [stock, setStock] = useState<Stock | null>(null)
  const [tabSelected, setTabSelected] = useState<TypeQuery>(TypeQuery.realtime)
  const [realValue, setSelectRealValue] = useState<Selection>(new Set([]))
  const [historicalValue, setSelectHistoricalValue] = useState<Selection>(new Set([]))
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [dataPoints, setDataPoints] = useState<Points[] | undefined>(undefined)
  const [title, setTitle] = useState<string>("")
  const maxDate = new Date()

  // Obtener el dato del stock
  useEffect(() => {
    const controller = new AbortController()
    setIsLoading(true)

    async function getStock() {
      if (params.symbol) {
        const response = await getStockBySymbol(params.symbol, controller.signal)
        setIsLoading(false)

        setStock(response.data.data?.[0])
      }
    }
    getStock()

    return () => {
      controller.abort()
    }
  }, [])

  // Validación del botón
  useEffect(() => {
    // Valido el botón
    if (tabSelected === TypeQuery.realtime) {
      setButtonDisabled(!Array.from(realValue)[0])
    } else if (tabSelected === TypeQuery.historic) {
      setButtonDisabled(!(Array.from(historicalValue)[0] && startDate && endDate))
    }
  }, [tabSelected, realValue, historicalValue, startDate, endDate])

  // Limpio el intervalo
  useEffect(() => {
    // Elimino el intervalo al desmontar el componente
    return () => {
      if (intervals.current !== null) {
        clearInterval(intervals.current)
      }
    }
  }, [])

  const handleTabChange = useCallback((key: React.Key) => {
    setTabSelected(key as TypeQuery)
  }, [])

  const handleFromDateChange = useCallback((date: Date) => {
    setStartDate(date)
  }, [])

  const handleToDateChange = useCallback((date: Date) => {
    setEndDate(date)
  }, [])

  // Query por tiempo real, intervalo
  const getTimeSeriesInterval = useCallback(
    async (controller: AbortController, interval: Interval) => {
      console.count("Intervalo!")

      setIsLoading(true)

      const response = await getTimeSeries(
        { symbol: params.symbol as string, interval },
        controller.signal,
      )

      // Formateando data
      const data = response.data.values?.map((value) => ({
        x: new Date(value.datetime),
        y: (Number(value.open) + Number(value.close)) / 2,
      }))

      setIsLoading(false)
      setDataPoints(data)
    },
    [],
  )

  // Graficar según lo seleccionado
  const handleGraph = useCallback(async () => {
    const controller = new AbortController()

    if (params.symbol) {
      // Query por tiempo real
      if (tabSelected === TypeQuery.realtime && realValue) {
        const interval = Array.from(realValue)[0] as Interval

        // Limpiando intervalo si es que ya existe
        if (intervals.current) {
          clearInterval(intervals.current)
          intervals.current = null
        }

        const time = interval.replace("min", "") as unknown as number

        getTimeSeriesInterval(controller, interval)

        intervals.current = setInterval(
          () => getTimeSeriesInterval(controller, interval),
          time * 60 * 1000,
        )

        setTitle(`Tiempo real \u2013 Intervalo: ${interval}`)
      }
      // Query por tiempo histórico
      else if (tabSelected === TypeQuery.historic && historicalValue && startDate && endDate) {
        // Limpio el intervalo si hago una query por histórico
        if (intervals.current !== null) {
          clearInterval(intervals.current)
        }
        setIsLoading(true)
        const start_date = format(startDate, "yyyy-MM-dd HH:mm:ss")
        const end_date = format(endDate, "yyyy-MM-dd HH:mm:ss")
        const interval = Array.from(historicalValue)[0] as Interval

        const response = await getTimeSeriesBetween(
          { symbol: params.symbol, interval, start_date, end_date },
          controller.signal,
        )

        // Formateando data
        const data = response.data.values?.map((value) => ({
          x: new Date(value.datetime),
          y: (Number(value.open) + Number(value.close)) / 2,
        }))

        setIsLoading(false)
        setDataPoints(data)
        setTitle(
          `Histórico \u2013 Desde: ${format(startDate, "dd/MM/yyyy HH:mm")}hs, hasta: ${format(
            endDate,
            "dd/MM/yyyy HH:mm",
          )}hs con intervalo de: ${interval}`,
        )
      }
    }
  }, [tabSelected, realValue, historicalValue, startDate, endDate])

  // Si no existe el parámetro
  if (!params.symbol) {
    return <></>
  }

  // Si todavía no terminó el request
  if (stock === null) {
    return <Loading />
  }

  // Si no existe stock al consultar el endpoint
  if (!stock) {
    return <NoStock symbol={params.symbol} />
  }

  return (
    <>
      <Container>
        <header>
          <h1 className='border-solid border-b-1 border-gray-200 text-lg font-semibold'>
            {stock.symbol} &#x2013; {stock.name} &#x2013; {stock.currency}
          </h1>
        </header>
        <section>
          <Tabs aria-label='Options' selectedKey={tabSelected} onSelectionChange={handleTabChange}>
            <Tab key='realtime' title='Tiempor real'>
              <Select
                label='Intervalo'
                placeholder='Selecciona un intervalo'
                labelPlacement='outside'
                className='max-w-xs'
                selectorIcon={<SelectorIcon />}
                selectedKeys={realValue}
                onSelectionChange={setSelectRealValue}
              >
                {Object.values(Interval).map((interval) => (
                  <SelectItem key={interval} value={interval}>
                    {interval}
                  </SelectItem>
                ))}
              </Select>
            </Tab>
            <Tab key='historic' title='Histórico'>
              <div className='flex flex-row items-end gap-4'>
                <DateInput
                  selectsStart
                  selected={startDate}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={handleFromDateChange}
                  maxDate={maxDate}
                  className='max-w-xs'
                  label='Fecha desde'
                  placeholder='DD/MM/YYYY hh:mm'
                  format='dd/MM/yyyy HH:mm'
                />
                <DateInput
                  selectsEnd
                  selected={endDate}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={handleToDateChange}
                  minDate={startDate}
                  maxDate={maxDate}
                  label='Fecha hasta'
                  placeholder='DD/MM/YYYY hh:mm'
                  format='dd/MM/yyyy HH:mm'
                />
                <div>
                  <Select
                    label='Intervalo'
                    placeholder='Selecciona un intervalo'
                    labelPlacement='outside'
                    selectorIcon={<SelectorIcon />}
                    selectedKeys={historicalValue}
                    onSelectionChange={setSelectHistoricalValue}
                  >
                    {Object.values(Interval).map((interval) => (
                      <SelectItem key={interval} value={interval}>
                        {interval}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              </div>
            </Tab>
          </Tabs>

          <Button color='primary' onClick={handleGraph} isDisabled={buttonDisabled}>
            Graficar
          </Button>
        </section>
      </Container>
      {isLoading ? (
        <Loading />
      ) : (
        dataPoints && (
          <div className='container mx-auto my-10'>
            <Chart title={title} data={dataPoints} />
          </div>
        )
      )}
    </>
  )
}
