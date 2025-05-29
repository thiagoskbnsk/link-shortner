import logo from '../assets/Logo.svg'

export const LinkLayout = ({children}: any) => {
  return (
    <div className="my-[88px] container mx-auto px-3">
      <div className="mb-6">
        <img src={logo} alt="Logo" className='h-6'/>
      </div>
      <div className="flex gap-5 items-start flex-col lg:flex-row">
        {children}
      </div>
    </div>
  )
}