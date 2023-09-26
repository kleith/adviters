type ContainerProps = {
  children: React.ReactNode
}

export const Container: React.FC<ContainerProps> = ({ children }) => (
  <div className='container m-4 p-4 mx-auto rounded-xl shadow-small w-full flex flex-col gap-4'>
    {children}
  </div>
)
