import Head from "next/head";
import Header from "./header";

const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <title>
                    AVON TRAVELS-Creating Trust Globally
                </title>
            </Head>
            <Header />
{children}
        </>
    );
}

export default Layout;