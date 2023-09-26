import { createContext, useContext, useState } from "react"

import { Snackbar, TypeSnackbar } from "@components/Snackbar"

type TypeColors = keyof typeof TypeSnackbar

type SnackbarContextActions = {
  showSnackbar: (text: string, type: TypeColors, time?: number) => void
}

const SnackbarContext = createContext<SnackbarContextActions>({ showSnackbar: () => {} })

const DEFAULT_TIME = 3

export const SnackbarProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false)
  const [message, setMessage] = useState<string>()
  const [typeColor, setTypeColor] = useState<TypeColors>(TypeSnackbar.default)
  const [time, setTime] = useState<number>(DEFAULT_TIME)

  const showSnackbar = (text: string, type: TypeColors = TypeSnackbar.default, time?: number) => {
    setMessage(text)
    setTypeColor(type)
    setTime(time || DEFAULT_TIME)
    setOpen(true)
  }

  const handleClose = () => {
    setTypeColor(TypeSnackbar.default)
    setOpen(false)
  }

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {open && (
        <Snackbar type={typeColor} autoHideDuration={time * 1000} onClose={handleClose}>
          {message}
        </Snackbar>
      )}
    </SnackbarContext.Provider>
  )
}

export const useSnackbar = () => useContext(SnackbarContext)
