const path = require('path')
const nodeExternals = require('webpack-node-externals')

const paths = require('../../utils/paths')

const { server: serverLoaders } = require('./loaders')
const resolvers = require('./resolvers')
const plugins = require('./plugins')

module.exports = {
    name: 'server',
    target: 'node',
    entry: {
        // server: [path.resolve(paths.SRC_SERVER, 'index.js')],
        server: [
            require.resolve('core-js/stable'),
            require.resolve('regenerator-runtime/runtime'),
            path.resolve(paths.SRC_SERVER, 'index.ts'),
        ],
    },
    externals: [
        nodeExternals({
            // we still want imported css from external files to be bundled otherwise 3rd party packages
            // which require us to include their own css would not work properly
            whitelist: /\.css$/,
        }),
    ],
    output: {
        path: paths.BUILD_SERVER,
        filename: 'server.js',
        publicPath: paths.PUBLIC_PATH,
        // libraryTarget: 'commonjs2',
    },
    resolve: { ...resolvers },
    module: {
        rules: serverLoaders,
    },
    plugins: [...plugins.shared, ...plugins.server],
    stats: {
        assets: false,
        cached: false,
        cachedAssets: false,
        chunks: false,
        chunkModules: false,
        children: false,
        colors: true,
        hash: false,
        modules: false,
        performance: false,
        reasons: false,
        timings: true,
        version: false,
    },
    node: {
        __dirname: false,
    },
}
