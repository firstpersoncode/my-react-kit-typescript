const fs = require('fs')
const path = require('path')
const paths = require('../utils/paths')

delete require.cache[require.resolve('../utils/paths')]

if (!process.env.NODE_ENV) {
    throw new Error(
        'The process.env.NODE_ENV environment variable is required but was not specified.'
    )
}

// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
const dotenvFiles = [
    `${paths.DOT_ENV}.${process.env.NODE_ENV}.local`,
    `${paths.DOT_ENV}.${process.env.NODE_ENV}`,
    process.env.NODE_ENV !== 'test' && `${paths.DOT_ENV}.local`,
    paths.DOT_ENV,
].filter(Boolean)

dotenvFiles.forEach((dotenvFile) => {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    if (fs.existsSync(dotenvFile)) {
        require('dotenv').config({
            path: dotenvFile,
        })
    }
})
// eslint-disable-next-line security/detect-non-literal-fs-filename
const appDirectory = fs.realpathSync(process.cwd())
process.env.NODE_PATH = (process.env.NODE_PATH || '')
    .split(path.delimiter)
    .filter((folder) => folder && !path.isAbsolute(folder))
    .map((folder) => path.resolve(appDirectory, folder))
    .join(path.delimiter)

module.exports = () => {
    // define env vars you want to use in your client app here.
    // CAREFUL: don't use any secrets like api keys or database passwords as they are exposed publicly!
    const raw = {
        NODE_ENV: process.env.NODE_ENV || 'development',
        PORT: process.env.PORT || 8500,
        HOST: process.env.HOST || 'http://localhost',
        COUNTRY: process.env.COUNTRY || 'sg',
        SOURCE_LANGUAGE: process.env.SOURCE_LANGUAGE || 'en_US',
    }

    // Stringify all values so we can feed into Webpack DefinePlugin
    const stringified = {
        'process.env': Object.keys(raw).reduce((env, key) => {
            // eslint-disable-next-line security/detect-object-injection
            env[key] = JSON.stringify(raw[key])
            return env
        }, {}),
    }

    return { raw, stringified }
}
