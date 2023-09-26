import { Button } from "@nextui-org/react"
import { Link } from "react-router-dom"

export const ErrorPage = () => (
  <div className='bg-zinc-50 flex items-center justify-center h-screen'>
    <div className='text-center'>
      <h1 className='text-8xl text-red-600 font-black mb-4'>Ups!</h1>
      <h3 className='text-xl text-slate-800 font-semibold my-4'>404 &#x2013; Page not found</h3>
      <p className='text-slate-500 my-4'>La página que estás buscando no se encuentra.</p>

      <Button as={Link} to='/' color='primary'>
        Volver
      </Button>
    </div>
  </div>
)
