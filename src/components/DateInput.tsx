import { Input } from "@nextui-org/react"
import { useRef } from "react"
import DatePicker, { ReactDatePickerProps, registerLocale } from "react-datepicker"
import es from "date-fns/locale/es"

registerLocale("es", es)

type DateInputProps = {
  label: string
  placeholder: string
  format: ReactDatePickerProps["dateFormat"]
} & Omit<ReactDatePickerProps, "placeholderText" | "dateFormat" | "locale">

export const DateInput: React.FC<DateInputProps> = ({ label, placeholder, format, ...props }) => {
  const inputRef = useRef(null)

  return (
    <div>
      <DatePicker
        locale='es'
        placeholderText={placeholder}
        customInput={
          <Input
            startContent={
              <CalendarIcon className='text-xl text-default-400 pointer-events-none flex-shrink-0' />
            }
            label={label}
            labelPlacement='outside'
            ref={inputRef}
          />
        }
        dateFormat={format}
        showTimeSelect
        {...props}
      />
    </div>
  )
}

type IconSVG = {
  className?: string
}

const CalendarIcon: React.FC<IconSVG> = ({ className }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke='currentColor'
    className={["w-5 h-5", className].join(" ")}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5'
    />
  </svg>
)
