import '@/styles/globals.css';

import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import {Toaster} from 'react-hot-toast';
import Layout from '@/components/layout/Layout';
import { store } from '@/contexts/store';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6kaRGkHZg4ZhK3UADYXF2XT8V9PzX1ro",
  authDomain: "store-spotifysongs.firebaseapp.com",
  projectId: "store-spotifysongs",
  storageBucket: "store-spotifysongs.appspot.com",
  messagingSenderId: "325638380820",
  appId: "1:325638380820:web:fd72e6e898c4f8872a3601"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export default function App({ Component,  pageProps: { session, ...pageProps }}) {
  return <>
    <SessionProvider session={session}>
      <Provider store={store}>
      <Layout>
        <Toaster position='top-right'/>
      <Component {...pageProps} />
  </Layout>
      </Provider>
    </SessionProvider>
  </>
}
