import Panel from "@/components/ui/Panel/Panel"
import NotFoundSvg from '@/assets/404.svg'

export const NotFound = () => {
  return (
    <div className="container mx-auto mt-[15%] flex justify-center">
      <Panel className="max-w-[580px] text-center flex justify-center flex-col gap-6 p-16">
        <img src={NotFoundSvg} className="h-[85px]" />
        <h1 className="text-xl text-gray-600">Link não encontrado</h1>
        <p className="text-md text-gray-500">
          O link que você está tentando acessar não existe, foi removido ou é uma URL inválida. Saiba mais em <a href="" className="text-blue-base underline">brev.ly</a>.
        </p>
      </Panel>
    </div>
  )
}