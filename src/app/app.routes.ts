import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Layout } from './pages/layout/layout';
import { Users } from './pages/users/users';
import { MedicineMaster } from './pages/medicine-master/medicine-master';
import { RegisterPatient } from './pages/patient/register-patient/register-patient';
import { PatientList } from './pages/patient/patient-list/patient-list';
import { Visit } from './pages/visit/visit';
import { OpenVisit } from './pages/open-visit/open-visit';
import { PageNotFound } from './pages/page-not-found/page-not-found';
import { authGuard } from './core/guards/auth-guard';
import { Dashboard } from './pages/dashboard/dashboard';
import { NotAccess } from './pages/not-access/not-access';
import { roleBasedAccessGuard } from './core/guards/role-based-access-guard';

export const routes: Routes = [
    {
        path:'',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: Login
    },
    {
        path:'register-patient',
        component:RegisterPatient
    },
    {
        path: '',
        component: Layout,
        canActivate:[authGuard],
        children:[
            {
                path:'dashboard',
                component:Dashboard,
                canActivate:[roleBasedAccessGuard]
            },
            {
                path: 'users',
                component: Users,
                canActivate:[roleBasedAccessGuard]
            },
            {
                path: 'medicine',
                component: MedicineMaster,
                canActivate:[roleBasedAccessGuard]
            },
            {
                path:'patient-list',
                component:PatientList,
                canActivate:[roleBasedAccessGuard]
            },
            {
                path:'visit',
                component:Visit,
                canActivate:[roleBasedAccessGuard]
            },
            {
                path:'open-visit/:patientId',
                component:OpenVisit,
                canActivate:[roleBasedAccessGuard]
            },
            {
                path:'not-access',
                component:NotAccess,
            }
        ]
    },
    {
        path:'**',
        component:PageNotFound
    }
];
