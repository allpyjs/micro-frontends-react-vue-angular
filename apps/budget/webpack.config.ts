import { composePlugins, withNx } from '@nx/webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import mfConfig from './module-federation.config';
import { withModuleFederation } from '@nx/react/module-federation';
import { VueLoaderPlugin } from 'vue-loader';

export default composePlugins(
  withNx(),
  withModuleFederation(mfConfig, { dts: false }),
  (config) => {
    config.output = {
      ...(config.output || {}),
      uniqueName: 'budget',
      scriptType: 'text/javascript',
      publicPath: 'auto',
    };

    config.plugins = [
      ...(config.plugins || []),
      new HtmlWebpackPlugin({
        template: './src/index.html', // Path to your index.html
        filename: 'index.html', // Output file name
      }),
      new VueLoaderPlugin(), // Add VueLoaderPlugin to support Vue files
    ];

    config.resolve = {
      ...config.resolve,
      alias: {
        ...(config.resolve?.alias || {}),
      },
      extensions: ['.mjs', '.js', '.ts', '.vue'], // Add '.vue' extension
      mainFields: ['browser', 'module', 'main'],
    };

    config.module = {
      ...config.module,
      rules: [
        {
          test: /\.vue$/, // Rule for Vue single-file components
          loader: 'vue-loader',
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            appendTsSuffixTo: [/\.vue$/], // Ensure TypeScript supports Vue files
          },
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/, // Rule for image assets
          type: 'asset/resource',
        },
      ],
    };

    return config;
  }
);
