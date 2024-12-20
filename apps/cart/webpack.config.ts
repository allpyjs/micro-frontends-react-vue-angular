import { composePlugins } from '@nx/webpack';
import config from './module-federation.config';
import { withModuleFederation } from '@nx/react/module-federation';

/**
 * DTS Plugin is disabled in Nx Workspaces as Nx already provides Typing support for Module Federation
 * The DTS Plugin can be enabled by setting dts: true
 * Learn more about the DTS Plugin here: https://module-federation.io/configure/dts.html
 */
export default composePlugins(
    withModuleFederation(config, {
        dts: false,
    }),
    (config) => {
        config.output = {
            ...(config.output || {}),
            uniqueName: 'cart',
            scriptType: 'text/javascript',
            publicPath: 'auto',
        };
        return config;
    }
);
