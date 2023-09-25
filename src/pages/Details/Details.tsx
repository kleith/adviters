import { Button, Select, SelectItem, Spinner, Tab, Tabs } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { Container } from "@components/Container"
import { DateInput } from "@components/DateInput"
import Twelvedata, { Stock } from "@services/Twelvedata"

import { SelectorIcon } from "./assets/Selector"

const intervals = ["1min", "5min", "15min"]

// TODO: remover esto - data dummy
const data = {
  name: "Tsla Inc",
  symbol: "TSLA",
  currency: "USD",
}

// Mostrar los detalles de la acción selecccionada
// TODO: crear 2 opciones: tiempo real e histórico
// TODO: tiempo real, debe habilitarse el intervalo de 5, 10 y 15 minutos
// TODO: histórico, debe ingresar 2 fechas y hora: la inicial y la final
// TODO: mostrar el gráfico
export const Details = () => {
  const params = useParams()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [stock, setStock] = useState<Stock>()
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  // TODO: obtener el dato del stock
  // useEffect(() => {
  //   const controller = new AbortController()
  //   setIsLoading(true)

  //   async function getStock() {
  //     if (params?.symbol) {
  //       const response = await Twelvedata.getStockBySymbol(params.symbol, controller)
  //       setIsLoading(false)

  //       setStock(response.data.data)
  //     }
  //   }
  //   getStock()

  //   return () => {
  //     controller.abort()
  //   }
  // }, [])

  const maxDate = new Date()

  const handleFromDateChange = (date: Date) => {
    setStartDate(date)
  }

  const handleToDateChange = (date: Date) => {
    setEndDate(date)
  }

  return (
    <Container>
      {isLoading && <Spinner />}
      <header>
        <h1 className='border-solid border-b-1 border-gray-200 text-lg font-semibold'>
          {data.symbol} &#x2013; {data.name} &#x2013; {data.currency}
        </h1>
      </header>
      <section>
        <Tabs aria-label='Options'>
          <Tab key='realtime' title='Tiempor real'>
            <p className='text-gray-500 text-sm mb-5'>
              Utiliza la fecha actual: al graficar esta opción, se debe actualizar el gráfico en
              forma automática según el intervalo seleccionado
            </p>

            <Select
              label='Intervalo'
              placeholder='Selecciona un intervalo'
              labelPlacement='outside'
              className='max-w-xs'
              disableSelectorIconRotation
              selectorIcon={<SelectorIcon />}
            >
              {intervals.map((interval, index) => (
                <SelectItem key={index} value={interval}>
                  {interval}
                </SelectItem>
              ))}
            </Select>
          </Tab>
          <Tab key='historic' title='Histórico'>
            <div className='flex flex-row gap-4'>
              <DateInput
                selectsStart
                selected={startDate}
                startDate={startDate}
                endDate={endDate}
                onChange={handleFromDateChange}
                maxDate={maxDate}
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
            </div>
          </Tab>
        </Tabs>

        <Button color='primary'>Graficar</Button>
      </section>
    </Container>
  )
}
