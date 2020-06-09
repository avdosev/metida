import React, {Suspense} from "react";
import Header from "../Molecules/Header/Header";
import Footer from "../Molecules/Footer/Footer";


export default function SimpleTemplate(props: any) {
    return (
        <>
            {/*<Header />*/}
            {props.children}
            {/*<Footer />*/}
        </>
    )
}