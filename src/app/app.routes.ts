import { Routes } from '@angular/router';
import { Main } from './landingpage/main/main';
import { About } from './landingpage/about/about';

export const routes: Routes = [
    { path: '', component: Main },
    { path: 'bout', component: About }
];
