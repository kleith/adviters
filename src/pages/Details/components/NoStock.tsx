import { Button } from "@nextui-org/react"
import { Link } from "react-router-dom"

type NoStock = {
  symbol: string
}

export const NoStock: React.FC<NoStock> = ({ symbol }) => {
  return (
    <div className='flex flex-col w-full min-h-[400px] justify-center items-center gap-10'>
      <div>
        No hay stock disponible para&nbsp;
        <strong>{symbol}</strong>.
      </div>
      <Button as={Link} to='/' color='primary'>
        Volver
      </Button>
    </div>
  )
}
