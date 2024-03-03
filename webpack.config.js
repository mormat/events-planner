const path = require('path');
// DefinePlugin

module.exports = {
    entry: {
        'scheduler':  ['./src/scheduler.jsx'],
    },
    output: {
        path: path.resolve(__dirname, 'web', 'build')
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                ]
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [],
    devtool: "source-map" 
}
