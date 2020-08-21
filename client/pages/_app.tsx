import React from 'react';
import { AppProps } from 'next/app';
import '../styles/style.sass';
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default MyApp;
