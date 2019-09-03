import path from 'path';
import * as express from 'express';
import cors from 'cors';
import chalk from 'chalk';
import manifestHelpers from 'express-manifest-helpers';
import bodyParser from 'body-parser';

import paths from '../../utils/paths';
import { logMessage } from '../../utils/helpers';

import errorHandler from './middleware/errorHandler';
import serverRenderer from './middleware/serverRenderer';
import addStore from './middleware/addStore';
import webhookVerification from './middleware/webhookVerification';
import { i18nextXhr, refreshTranslations } from './middleware/i18n';

require('dotenv').config();

const app = express.default();

// Use Nginx or Apache to serve static assets in production or remove the if() around the following
// lines to use the express.static middleware to serve assets for production (not recommended!)
if (process.env.NODE_ENV === 'development') {
    app.use(paths.PUBLIC_PATH, express.static(path.join(paths.BUILD_CLIENT, paths.PUBLIC_PATH)));
}

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/locales/refresh', webhookVerification, refreshTranslations);

// It's probably a good idea to serve these static assets with Nginx or Apache as well:
app.get('/locales/:locale/:ns.json', i18nextXhr);

app.use(addStore);

const manifestPath = path.join(paths.BUILD_CLIENT, paths.PUBLIC_PATH);

app.use(
    manifestHelpers({
        manifestPath: `${manifestPath}/manifest.json`,
    })
);

app.use(serverRenderer());

app.use(errorHandler);

app.listen(process.env.PORT || 8500, () => {
    logMessage(`App is running: http://localhost:${process.env.PORT || 8500}`);
});

export default app;
