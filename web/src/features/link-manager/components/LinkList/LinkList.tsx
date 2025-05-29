import { Button } from "@/components"
import Panel from "@/components/ui/Panel/Panel"
import { DownloadIcon, LinkIcon } from "@phosphor-icons/react"
import { useLinkManager } from "../../hooks/useLinkManager/useLinkManager"
import { LinkListItem } from "./LinkListItem"
import { useEffect } from "react"

export const LinkList = () => {
  const {links, getLinks, downloadCSV} = useLinkManager()
  
  useEffect(() => {
    getLinks()
  }, [])
  
  return (
    <Panel title="Meus links" rightComponent={<Button variant="secondary" size="sm" onClick={downloadCSV} leftIcon={DownloadIcon}>Baixar CSV</Button>}>
      {links.map(link => <LinkListItem key={link.id} {...link} />)}

      {!links.length && (
        <div className="border-t border-gray-200 pt-8 pb-6 flex justify-center items-center flex-col gap-3">
          <LinkIcon size={32} className=" text-gray-400" />
          <p className="text-xs uppercase text-gray-500">ainda não existem links cadastrados</p>
        </div>
      )}
    </Panel>
  )
}