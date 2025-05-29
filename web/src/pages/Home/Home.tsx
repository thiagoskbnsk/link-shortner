import { LinkCreate } from "@/features/link-manager/components/LinkCreate/LinkCreate"
import { LinkList } from "@/features/link-manager/components/LinkList/LinkList"
import { LinkManagerProvider } from "@/features/link-manager/providers/LinkManagerProvider/LinkManagerProvider"
import { LinkLayout } from "@/layouts/LinkLayout"

export const Home = () => {
  return (
    <LinkManagerProvider>
      <LinkLayout>
        <LinkCreate />
        <LinkList />
      </LinkLayout>
    </LinkManagerProvider>
  )
}