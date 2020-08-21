import React, { PropsWithChildren } from 'react';
import { Header } from './Header';

interface LayoutProps {
    title: string;
    description: string;
}

export const Layout = ({
    title,
    description,
    children,
}: PropsWithChildren<LayoutProps>) => {
    return (
        <React.Fragment>
            <Header title={title} description={description} />
            <div className="container">
                <div className="welcome text-center card mt-4 p-4">
                    <h1>{title}</h1>
                </div>
                {children}
            </div>
        </React.Fragment>
    );
};
