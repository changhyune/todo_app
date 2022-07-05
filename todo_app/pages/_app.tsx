import '../styles/globals.css'
import '../styles/tailwind.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {

  return(
    <div className="h-screen bg-gray-900">
      <Component {...pageProps} />
    </div>
  ) 
}

export default MyApp
