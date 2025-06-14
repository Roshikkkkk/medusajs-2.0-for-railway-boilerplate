import { Metadata } from "next"
import Footer from "@modules/layout/templates/footer"
import { getBaseURL } from "@lib/util/env"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function PageLayout(props: { children: React.ReactNode }) {
  return (
    <>
      {props.children}
      <Footer />
    </>
  )
}