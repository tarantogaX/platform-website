import '../styles/globals.css';
import React, {useEffect} from 'react';
import {AppContext, AppProps} from 'next/app';
import {createGlobalStyle, ThemeContext} from 'styled-components';
import {DefaultTheme} from '../styles/theme';
import MeetITHeader from '../components/header/MeetITHeader';
import PageWrapper from '../components/page-wrapper/PageWrapper';
import Head from 'next/head';
import MeetITFooter from '../components/footer/MeetITFooter';
import 'react-perfect-scrollbar/dist/css/styles.css';

const GlobalStyle = createGlobalStyle`
    @font-face {
      font-family: 'MontserratBold';
      font-display: swap;
      src: url('/fonts/MontserratBold.ttf')  format('truetype');
    }
    @font-face {
      font-family: 'MontserratSemiBold';
      font-display: swap;
      src: url('/fonts/MontserratSemiBold.ttf')  format('truetype');
    }
    
    @font-face {
      font-family: 'MontserratRegular';
      font-display: swap;
      src: url('/fonts/MontserratRegular.ttf')  format('truetype');
    }

    @font-face {
      font-family: 'MontserratHeavy';
      font-display: swap;
      src: url('/fonts/MontserratThin.ttf')  format('truetype');
    }
    
    html {
      scroll-behavior: smooth;
      overflow-y: auto;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
    }
    
    .slick-arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 30px;
      height: 30px;
      z-index: 1;
      
      &.slick-next {
        right: 50px;
      }
      
      &.slick-prev {
        left: 50px;
      }
      ::before {
        font-size: 30px; 
        
      color: rgba(0,0,0,0.4);
      }
    }
    
    .slick-slider .slick-track,
    .slick-slider .slick-list
    {
        -webkit-transform: none;
           -moz-transform: none;
            -ms-transform: none;
             -o-transform: none;
                transform: none;
    }
    
    body {
      overflow: hidden;
    }
`;

type MyAppProps = {
    lang: string;
};

const MyApp = (appProps: AppProps<MyAppProps>) => {
    const {Component, pageProps} = appProps;

    return (
        <ThemeContext.Provider value={DefaultTheme}>
            <GlobalStyle />
            <Head>
                <title>Meet IT Kompendium</title>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name={'description'}
                    content={
                        'Artykuły z algorytmiki i programowania, które pomogą Ci przygotować się do Olimpiady Informatycznej'
                    }
                />
                <meta
                    name={'facebook-domain-verification'}
                    content={'jo17m5pc48bx3261108tu2e4f7pnn0'}
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <>
                <MeetITHeader />
                <PageWrapper>
                    <Component {...pageProps} />
                    <MeetITFooter />
                </PageWrapper>
            </>
        </ThemeContext.Provider>
    );
};

export default MyApp;
