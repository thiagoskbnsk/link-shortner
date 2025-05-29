import { Button } from "@/components"
import { CopyIcon, TrashIcon } from "@phosphor-icons/react"
import { useLinkManager } from "../../hooks/useLinkManager/useLinkManager"
import { useMemo } from "react"

export const LinkListItem = ({id, shortUrl, originalUrl, accessCount}: any) => {
  const {copyLink, removeLink, increaseAccessCounter} = useLinkManager()
  
  const accessText = useMemo(() => {
    if (accessCount === 0) {
      return 'nenhum acesso'
    }
    if (accessCount === 1) {
      return '1 acesso'
    }

    return `${accessCount} acessos`
  }, [accessCount])

  const shortUrlConcat = `${import.meta.env.VITE_FRONTEND_URL}/${shortUrl}`

  const handleDelete = () => {
    confirm(`Tem certeza que deseja excluir o link ${shortUrl}?`) && removeLink(id)
  }

  return (
    <div className="flex items-center justify-between py-4 border-t border-gray-200 ">
      <div className="w-100">
        <a href={shortUrl} onClick={() => increaseAccessCounter(id)} target="_blank" rel="noopener noreferrer" className="text-md text-blue-base mb-1 whitespace-nowrap text-ellipsis overflow-hidden">
          {shortUrlConcat}
        </a>
        <p className="text-sm text-gray-500 whitespace-nowrap text-ellipsis overflow-hidden">
          {originalUrl}
        </p>
      </div>
      <div className="flex items-center gap-5">
        <span className="inline-flex w-100 text-right text-gray-500">{accessText}</span>
        <div className="flex gap-1">
          <Button variant="secondary" size="sm" leftIcon={CopyIcon} onClick={() => copyLink(id)} />
          <Button variant="secondary" size="sm" leftIcon={TrashIcon} onClick={handleDelete} />
        </div>
      </div>
    </div>
  )
}