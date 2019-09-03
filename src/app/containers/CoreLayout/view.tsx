import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { renderRoutes } from 'react-router-config';

import pages from '../../pages';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import favicon from './assets/favicon.png';

import css from './style.module.css';

const CoreLayoutView: React.FC<any> = () => {
    return (
        <div className={css.wrapper}>
            <Helmet
                defaultTitle="React SSR Starter – TypeScript Edition"
                titleTemplate="%s – React SSR Starter – TypeScript Edition"
                link={[{ rel: 'icon', type: 'image/png', href: favicon }]}
            />
            <Header />
            {renderRoutes(pages)}
            <Footer />
        </div>
    );
};

export default CoreLayoutView;
