import { Routes } from '@angular/router';
import { Main } from './landingpage/main/main';
import { About } from './landingpage/about/about';
import { TestLanding } from './test-landing/test-landing';

export const routes: Routes = [
    { path: '', component: Main },
    { path: 'test', component: TestLanding }
];
