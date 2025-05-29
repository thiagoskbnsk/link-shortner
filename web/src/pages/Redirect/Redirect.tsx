import Panel from "@/components/ui/Panel/Panel"
import { useParams, useNavigate } from "react-router";
import LogoIcon from '@/assets/Logo_Icon.svg'
import { useLinkManager } from "@/features/link-manager/hooks/useLinkManager/useLinkManager";
import { useCallback, useEffect, useState } from "react";

export const Redirect = () => {
  const [originalUrl, setOriginalUrl] = useState<string>('');
  const {getLinkByShortUrl} = useLinkManager()
  const [diffId, setDiffId] = useState<string>('');
  const navigate = useNavigate();

  const {linkId} = useParams()

  const getOriginalUrl = useCallback(async (shortUrl: string) => {
    const link = await getLinkByShortUrl(shortUrl);

    console.log({link})
    if (link) {
      setOriginalUrl(link.originalUrl);

      window.location.href = link.originalUrl

      return
    }

    navigate('/not-found')
  }, [getLinkByShortUrl])

  useEffect(() => {
    if (diffId) {
      getOriginalUrl(diffId)
    }
  }, [diffId])

  useEffect(() => {
    if (linkId !== diffId) {
      setDiffId(linkId || '');
    }
  }, [linkId, diffId])

  return (
    <div className="container mx-auto mt-[15%] flex justify-center">
      <Panel className="max-w-[580px] text-center flex justify-center flex-col gap-6 p-16">
        <img src={LogoIcon} className="h-12" />
        <h1 className="text-xl text-gray-600">Redirecionando...</h1>
        <div>
          <p className="text-md text-gray-500 mb-1">
            O link será aberto automaticamente em alguns instantes.
          </p>
          <p className="text-md text-gray-500">
            Não foi redirecionado? <a href={originalUrl} className="text-blue-base underline">Acesse aqui</a>
          </p>
        </div>
      </Panel>
    </div>
  )
}