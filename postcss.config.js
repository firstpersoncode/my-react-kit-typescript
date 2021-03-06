const paths = require('./utils/paths')

module.exports = {
    plugins: [
        require('postcss-import')({
            path: [paths.SRC_APP, `${__dirname}/node_modules`],
        }),
        require('postcss-nested')(),
        require('postcss-flexbugs-fixes')(),
        require('autoprefixer')(),
        require('postcss-custom-properties')(),
        require('postcss-assets')({
            basePath: './assets',
        }),
        // This is broken.
        // require('postcss-normalize')(),
    ],
    sourceMap: true,
}
