import {useState, createContext, type Dispatch, type ReactNode} from 'react'

interface LinkManagerProviderProps {
  children: ReactNode
}

interface Link {
  id: string
  originalUrl: string
  shortUrl: string
  accessCount: number
}

interface LinkManagerContextProps {
  links: Array<Link>
  setLinks: Dispatch<React.SetStateAction<Array<Link>>>
}

export const LinkManagerContext = createContext<LinkManagerContextProps>({} as LinkManagerContextProps)

export const LinkManagerProvider = ({children}: LinkManagerProviderProps) => {
  const [links, setLinks] = useState<Array<Link>>([])
  
  return (
    <LinkManagerContext.Provider value={{links, setLinks}}>
      {children}
    </LinkManagerContext.Provider>
  )
}
