// @ts-ignore
import App from './App.svelte';


export const bootstrap = (container: HTMLElement) => {
    const app = new App({
        target: container,
    });
    return app;
};