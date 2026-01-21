import { Routes } from '@angular/router';
import { workingGuard } from './guards/working-guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'portal',
        pathMatch: 'full',
    },
    {
        path: 'portal',
        loadComponent: () => import('./pages/portal-page').then(m => m.PortalPage)
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login-page').then(m => m.LoginPage),
    },
    {
        path: 'working',
        loadComponent: () => import('./pages/working-page').then(m => m.WorkingPage),
        canActivate: [workingGuard]
    }
];


