import '@/styles/globals.css';

import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

import Layout from '@/components/layout/Layout';

export default function App({ Component,  pageProps: { session, ...pageProps }, }: AppProps) {
  return <>
    <SessionProvider session={session}>
      <Layout>
        <div>
          <p className='text-white text-xl'>{JSON.stringify(session)}</p>
        </div>
      <Component {...pageProps} />
  </Layout>
    </SessionProvider>
  </>
}
