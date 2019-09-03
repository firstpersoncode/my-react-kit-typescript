import * as React from 'react';
import * as express from 'express';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';

import IntlProvider from '../../app/containers/IntlProvider';
import CoreLayout from '../../app/containers/CoreLayout';
import HTML from '../../app/containers/HTML';

const helmetContext = {};
const routerContext = {};

const serverRenderer: any = () => (
    req: express.Request & { store: Store },
    res: express.Response
) => {
    const content = renderToString(
        <Provider store={res.locals.store}>
            <Router location={req.url} context={routerContext}>
                <IntlProvider>
                    <HelmetProvider context={helmetContext}>
                        <CoreLayout />
                    </HelmetProvider>
                </IntlProvider>
            </Router>
        </Provider>
    );

    const state = JSON.stringify(res.locals.store.getState());

    return res.send(
        '<!doctype html>' +
            renderToString(
                <HTML
                    css={[res.locals.assetPath('bundle.css'), res.locals.assetPath('vendor.css')]}
                    helmetContext={helmetContext}
                    scripts={[res.locals.assetPath('bundle.js'), res.locals.assetPath('vendor.js')]}
                    state={state}
                >
                    {content}
                </HTML>
            )
    );
};

export default serverRenderer;
