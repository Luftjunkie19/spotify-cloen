import '@/styles/globals.css';

import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import Layout from '@/components/layout/Layout';
import { store } from '@/contexts/store';

export default function App({ Component,  pageProps: { session, ...pageProps }, }: AppProps) {
  return <>
    <SessionProvider session={session}>
      <Provider store={store}>
      <Layout>
        <div>
          <p className='text-white text-xl'>{JSON.stringify(session)}</p>
        </div>
      <Component {...pageProps} />
  </Layout>
      </Provider>
    </SessionProvider>
  </>
}
