const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const appPath = "src";
const distPath = "dist";

const config = {
    context: path.resolve(__dirname, appPath),
    entry: "./index.ts",
    devtool: "inline-source-map",
    mode: "production",
    devServer: {
        contentBase: path.resolve(__dirname, distPath)
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: "html-loader"
            },
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin([
            distPath
        ]),
        new HtmlWebpackPlugin({
            template: "index.html"
        })
    ],
    resolve: {
        extensions: [
            ".ts",
            ".js"
        ]
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, distPath)
    }
};

module.exports = config;
