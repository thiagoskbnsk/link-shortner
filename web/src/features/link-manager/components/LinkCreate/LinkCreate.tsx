import {Input, Button} from "@/components"
import Panel from "@/components/ui/Panel/Panel"
import { useForm, type SubmitHandler } from "react-hook-form"
import { useLinkManager } from "../../hooks/useLinkManager/useLinkManager"

type Inputs = {
  original: string
  new: string
}

export const LinkCreate = () => {
  const {
    register,
    handleSubmit,
    formState: {errors, isLoading, isSubmitting},
    reset,
  } = useForm<Inputs>()
  const {addLink} = useLinkManager()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await addLink(data.original, data.new)

    if (response?.error) {
      alert(response.error)

      return
    }

    reset()
  }

  const formLoading = isLoading || isSubmitting

  return (
    <Panel title="Novo link" className="lg:max-w-[380px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input disabled={formLoading} id="original" className="mb-4" label="Link original" placeholder="https://www.exemplo.com.br" register={register} required errorMessage={errors.original?.message}/>
        <Input prefix="brev.ly/" disabled={formLoading} id="new" className="mb-6" label="Link encurtado" register={register} required errorMessage={errors.new?.message} />

        <Button type="submit" isLoading={formLoading} disabled={formLoading}>Salvar link</Button>
      </form>
    </Panel>
  )
}