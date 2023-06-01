/**
 * Layout Component
 *
 * This component represents the layout of the application. It wraps the content with a container and
 * includes the Header component at the top. The Archivo font is applied to the layout.
 *
 * Usage:
 * <Layout>
 *    ...content
 * </Layout>
 */

import { Archivo } from 'next/font/google';
import Header from '../Header';
import React, { ReactNode } from 'react';

const archivo = Archivo({ subsets: ['latin'] });

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className={`${archivo.className} mb-5`}>
            <div className="container">
                <Header />
                {children}
            </div>
        </div>
    );
};

export default Layout;
