import { Metadata } from "next"
import Footer from "@modules/layout/templates/footer"
import NewNav from "@modules/layout/templates/nav/NewNav"
import { getBaseURL } from "@lib/util/env"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function PageLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <NewNav />
      {props.children}
      <Footer />
    </>
  )
}