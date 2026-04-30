import { Routes } from '@angular/router';
import { Main } from './landingpage/main/main';

export const routes: Routes = [
  { path: '', component: Main },
  { path: 'impressum', loadComponent: () => import('./imprint/imprint').then(m => m.Imprint) },
  { path: 'datenschutz', loadComponent: () => import('./policy/policy').then(m => m.Policy) },
];
