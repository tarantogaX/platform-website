import Head from 'next/head';
import * as React from 'react';
import {FunctionComponent} from 'react';
import Center from '../components/central/Center';


const Home: FunctionComponent = () => {
    return (
        <>
            <Head>
                <title>Meet IT Kompendium</title>
            </Head>
            <Center>
                <img
                    style={{
                        width: '100%',
                    }}
                    src={`/images/end_text_pl.svg`}
                    alt={'Dołącz do ludzi który mają ambitne cele i działaj razem z nimi!'}
                />
            </Center>
        </>
    );
};

export default Home;
