import type { AppProps /*, AppContext */ } from 'next/app'
import React from 'react'
import '../styles/global.css'

function App({ Component, pageProps }: AppProps) {
   return <Component {...pageProps} />;
}

export default App;
