import {
  Input,
  Link,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react"
import { useCallback, useEffect, useMemo, useState } from "react"

import TwelvedataService, { Stocks } from "./services/Twelvedata"
import { paginate } from "./utils/pagination"
import { SearchIcon } from "./assets/SearchIcon"

// [Done] listado de acciones en tabla con paginado
export const Index = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [stocks, setStocks] = useState<Stocks[]>([])
  const [filterSymbol, setFilterSymbol] = useState<string>("")
  const [filterName, setFilterName] = useState<string>("")

  const rowsPerPage = 15

  // Obtener stocks del servicio
  useEffect(() => {
    const controller = new AbortController()
    setIsLoading(true)

    async function getActions() {
      const actions = await TwelvedataService.getStocks(controller)
      setIsLoading(false)

      setStocks(actions.data.data)
    }
    getActions()

    return () => {
      controller.abort()
    }
  }, [])

  let pages: Stocks[][] = []

  if (stocks.length) {
    pages = paginate<Stocks>(stocks, rowsPerPage)
  }

  const onSearchSymbolChange = useCallback((value: string) => {
    if (value) {
      setFilterSymbol(value)
      setPage(1)
    } else {
      setFilterSymbol("")
    }
  }, [])

  const onSearchNameChange = useCallback((value: string) => {
    if (value) {
      setFilterName(value)
      setPage(1)
    } else {
      setFilterName("")
    }
  }, [])

  const onChangePage = useCallback((page: number) => setPage(page), [page])

  const hasSearchStockFilter = Boolean(filterSymbol)
  const hasSearchNameFilter = Boolean(filterName)

  const filteredItems = useMemo(() => {
    let filteredStocks = [...stocks]

    if (hasSearchStockFilter) {
      filteredStocks = filteredStocks.filter((stock) =>
        stock.symbol.toLowerCase().includes(filterSymbol.toLowerCase()),
      )
    }

    if (hasSearchNameFilter) {
      filteredStocks = filteredStocks.filter((stock) =>
        stock.name.toLowerCase().includes(filterName.toLowerCase()),
      )
    }

    return filteredStocks
  }, [stocks, filterSymbol, filterName])

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return filteredItems.slice(start, end)
  }, [page, filteredItems, rowsPerPage])

  console.count("Render")

  // [DONE] búsqueda por nombre de acción
  // [DONE] búsqueda por símobolo
  // [DONE] el símbolo debe ser un link para ver el detalle de la acción

  // TODO: arreglar el paginado
  // TODO: agregar react router para el link del símbolo
  return (
    <div className='container m-4 p-4 mx-auto rounded-xl rounded-large shadow-small w-full flex flex-col gap-4'>
      <div className='flex justify-between gap-4 items-end'>
        <Input
          isClearable
          classNames={{
            base: "w-full sm:max-w-[50%]",
            inputWrapper: "border-1",
          }}
          placeholder='Buscar por símbolo...'
          size='sm'
          startContent={<SearchIcon className='text-default-300' />}
          value={filterSymbol}
          variant='bordered'
          onClear={() => setFilterSymbol("")}
          onValueChange={onSearchSymbolChange}
        />
        <Input
          isClearable
          classNames={{
            base: "w-full sm:max-w-[50%]",
            inputWrapper: "border-1",
          }}
          placeholder='Buscar por nombre...'
          size='sm'
          startContent={<SearchIcon className='text-default-300' />}
          value={filterName}
          variant='bordered'
          onClear={() => setFilterName("")}
          onValueChange={onSearchNameChange}
        />
      </div>
      <Table
        isStriped
        removeWrapper
        aria-label='Tabla de acciones'
        classNames={{
          table: "min-h-[400px]",
          th: ["bg-transparent", "border-b", "border-divider"],
        }}
        bottomContent={
          pages.length > 0 ? (
            <div className='flex w-full justify-center'>
              <Pagination
                isCompact
                showControls
                showShadow
                color='primary'
                siblings={2}
                page={page}
                total={pages.length}
                onChange={onChangePage}
              />
            </div>
          ) : null
        }
      >
        <TableHeader>
          <TableColumn>SÍMBOLO</TableColumn>
          <TableColumn>NOMBRE</TableColumn>
          <TableColumn>MONEDA</TableColumn>
          <TableColumn>TIPO</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent='Acción no encontrada'
          items={items}
          isLoading={isLoading}
          loadingContent={<Spinner label='Loading...' />}
        >
          {(stock) => (
            <TableRow key={stock.symbol}>
              <TableCell>
                <Link href={`/details/${stock.symbol}`}>{stock.symbol}</Link>
              </TableCell>
              <TableCell>{stock.name}</TableCell>
              <TableCell>{stock.currency}</TableCell>
              <TableCell>{stock.type}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
