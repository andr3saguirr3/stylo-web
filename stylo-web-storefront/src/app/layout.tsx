import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>  
      <div className="w-full bg-black text-white text-center py-2 text-sm">
        Envío gratis a toda la república 
      </div>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
