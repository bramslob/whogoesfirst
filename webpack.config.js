var path                = require("path");
var webpack             = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = [
    {
        name   : 'wgf-jQuery',
        entry  : [
            './jQuery/src/js/app.js',
            './jQuery/src/sass/style.scss'
        ],
        output : {
            path    : path.join(__dirname, '/jQuery/dist'),
            filename: 'js/app.js'
        },
        module : {
            rules: [
                {
                    test: /\.scss$/,
                    use : ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use     : ['css-loader', 'sass-loader']
                    }),
                },
                {
                    test   : /\.js$/,
                    exclude: /node_modules/,
                    loader : "babel-loader"
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin("css/styles.css")
        ]
    }
];