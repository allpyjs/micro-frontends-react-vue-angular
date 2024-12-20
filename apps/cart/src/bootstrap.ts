import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config'; // Ensure this is correctly set up
import { AppComponent } from './app/app.component';

export const bootstrap = () => bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));