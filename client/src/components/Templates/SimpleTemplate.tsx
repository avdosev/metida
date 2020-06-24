import React, { Suspense } from 'react';
import Footer from '../Molecules/Footer/Footer';

export default function SimpleTemplate(props: any) {
    return (
        <>
            {/*<Header />*/}
            {props.children}
            {/*<Footer />*/}
        </>
    );
}
