import webpack from 'webpack';
import path from 'path';

module.exports = {
    entry: './client/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    module: {
        loaders: [{
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                include: path.join(__dirname, 'client'),
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react', 'stage-0']
                }
            },
            {
                test: /\.css$/,
                loaders: ["style-loader", "css-loader", "less-loader"]
            },
            {
                test: /\.styl$/,
                loader: "style-loader"
            }, 
            {
                test: /\.(json|svg|ttf|woff|eot|woff2)$/,
                loader: 'file-loader'
            },
            {
                test: /\.(gif|jpg|png)$/,
                loader: "file-loader",
            }
        ]
    },

    devServer: {
        hot: true,
        contentBase:''
    }
};
