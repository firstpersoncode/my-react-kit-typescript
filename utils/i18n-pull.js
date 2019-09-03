const path = require('path');

require('dotenv').config({
    path: path.join(__dirname, '../.env'),
});

const paths = require('../utils/paths');
const { download, writeFiles, cleanup } = require('./i18n-lokalise');

const pull = async () => {
    const data = await download();
    await writeFiles(data, paths.LOCALES);
    cleanup();
};

pull();
