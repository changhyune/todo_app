import '../styles/globals.css'
import '../styles/tailwind.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }: AppProps) {

  return(
    <div className="h-screen bg-gray-900">
      <SessionProvider>
        <Component {...pageProps} />
      </SessionProvider>
    </div>
  ) 
}

export default MyApp
