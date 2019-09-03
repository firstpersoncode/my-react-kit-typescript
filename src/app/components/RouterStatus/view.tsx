import React from 'react';
import { Route } from 'react-router';

const RouterStatusView = ({ code, children }) => (
    <Route
        render={({ staticContext }) => {
            if (staticContext) {
                staticContext.status = code;
            }
            return children;
        }}
    />
);

export default RouterStatusView;
