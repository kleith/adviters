import { useEffect } from "react"

export enum TypeSnackbar {
  "default" = "default",
  "success" = "success",
  "warning" = "warning",
  "error" = "error",
}

type SnackbarProps = {
  children: string | React.ReactNode
  type: keyof typeof TypeSnackbar
  autoHideDuration: number
  onClose: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const Snackbar: React.FC<SnackbarProps> = ({
  children,
  type,
  autoHideDuration,
  onClose,
}) => {
  let bgColor: string = ""
  switch (type) {
    case TypeSnackbar.success:
      bgColor = "bg-emerald-500"
      break
    case TypeSnackbar.warning:
      bgColor = "bg-yellow-400"
      break
    case TypeSnackbar.error:
      bgColor = "bg-red-600"
      break
    case TypeSnackbar.default:
    default:
      bgColor = "bg-slate-800"
      break
  }

  useEffect(() => {
    const interval = setTimeout(onClose, autoHideDuration)
    return () => clearTimeout(interval)
  }, [autoHideDuration, onClose])

  return (
    <div className='flex fixed items-center justify-center left-0 right-0 bottom-8'>
      <div
        className={[
          "flex flex-row items-center justify-start rounded-md shadow-md text-white min-w-[300px] max-w-xl",
          bgColor,
        ].join(" ")}
      >
        <div className='px-4 py-3 grow'>{children}</div>
        <button className='p-2 mr-2' onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
    </div>
  )
}

const CloseIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke='currentColor'
    className='w-5 h-5'
  >
    <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
  </svg>
)
