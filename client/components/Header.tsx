import React from 'react';
import Head from 'next/head';

interface HeaderProps {
    title: string;
    description: string;
}

export const Header = ({ title, description }: HeaderProps) => {
    return (
        <React.Fragment>
            <Head>
                <title>{title} | robots.txt</title>
                <meta charSet="utf-8" />
                <meta name="theme-color" content="#317EFB" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="description" content={description} />
                <meta name="twitter:title" content={title} />
                <meta property="og:title" content={title} />
                <meta
                    name="viewport"
                    content="width=device-width, minimum-scale=1, shrink-to-fit=no, initial-scale=1, user-scalable=no"
                />
            </Head>
            <nav className="navbar navbar-light bg-light navbar-fixed-top">
                <a className="navbar-brand p-2 ml-4" href="/">
                    ocellus
                </a>
            </nav>
        </React.Fragment>
    );
};
