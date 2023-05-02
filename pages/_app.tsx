// import '@styles/tailwind.css';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ToastProvider } from '@apideck/components';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ToastProvider>
      <Component {...pageProps} />
    </ToastProvider>
  )
}