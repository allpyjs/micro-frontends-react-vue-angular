import { composePlugins, withNx } from '@nx/webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import mfConfig from './module-federation.config';
import { withModuleFederation } from '@nx/react/module-federation';

export default composePlugins(
  withNx(),
  withModuleFederation(mfConfig, { dts: false }),
  (config) => {
    config.output = {
      ...(config.output || {}),
      uniqueName: 'products',
      scriptType: 'text/javascript',
      publicPath: 'auto',
    };
    config.plugins = [
      ...(config.plugins || []),
      new HtmlWebpackPlugin({
        template: './src/index.html', // Path to your index.html
        filename: 'index.html', // Output file name
      }),
    ];

    config.resolve = {
      ...config.resolve,
      alias: {
        ...(config.resolve?.alias || {}),
      },
      extensions: ['.mjs', '.js', '.ts', '.svelte'],
      mainFields: ['svelte', 'browser', 'module', 'main'],
    };

    config.module = {
      ...config.module,
      rules: [
        {
          test: /\.svelte$/,
          use: {
            loader: 'svelte-loader',
            options: {
              emitCss: true,
              hotReload: true,
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    };

    return config;
  }
);
