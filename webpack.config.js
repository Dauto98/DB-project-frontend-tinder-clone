const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  context: path.resolve(__dirname), // make all relative path relative to this instead of cwd
  entry: {
    main: "./src/index.js" // chunkname : "path to start bundling this chunk"
  },
  output: {
    filename: "[name].[hash].js", // name of the outputed files
    path: path.resolve(__dirname, "dist"), // where to put those files
    publicPath: "/" // the address seen from the web URL, after the domain
  },
  devtool: "source-map", // source map
  devServer: {
    publicPath: "/", // this need to be the same as output.publicPath
    host: "localhost", // combine with port, will server your app through localhost:8080
    port: 7070,
    historyApiFallback: true,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/,
        include: [/node_modules/],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: false, // turn css selectors into hashes
              importLoaders: 1, // 1 loader will be applied before css-loader
            }
          },
          {
            loader: "postcss-loader",
            options: {
              config: {
                ctx: {
                  autoprefixer: {
                    browsers: "last 2 versions" //only support last 2 versions of browser
                  }
                }
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: [/node_modules/],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true, // turn css selectors into hashes
              importLoaders: 1, // 1 loader will be applied before css-loader
              localIdentName: "[name]_[local]_[hash:base64:5]",
              camelCase: true,
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              config: {
                ctx: {
                  autoprefixer: {
                    browsers: "last 2 versions" //only support last 2 versions of browser
                  }
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png)$/i,
        loader: "responsive-loader",
        options: {
          sizes: [360, 800, 1200, 1400], // the width of the output images, you should adapt to your app
          placeholder: true,
          adapter: require("responsive-loader/sharp"),
          name: "./assets/images/[hash]-[width].[ext]"
        }
      }
    ]
  },
  optimization: {
    runtimeChunk: true, // create a chunk containing webpack runtime code
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/, // get all modules in node_modules
          priority: -10,
          chunks: "all",
          name: "vendor"
        }
      }
    },
    namedModules: true,
    namedChunks: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css", // sync chunk
      // chunkFilename: "[id].css" // async chunk
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      ENV: JSON.stringify("local"),
      API_URL: JSON.stringify("http://localhost:3000")
    }),
  ]
};
