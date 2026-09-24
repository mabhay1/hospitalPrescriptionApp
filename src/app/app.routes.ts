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
        children:[
            {
                path: 'users',
                component: Users
            },
            {
                path: 'medicine',
                component: MedicineMaster
            },
            {
                path:'patient-list',
                component:PatientList
            },
            {
                path:'visit',
                component:Visit
            },
            {
                path:'open-visit/:patientId',
                component:OpenVisit
            }
        ]
    },
    {
        path:'**',
        component:PageNotFound
    }
];
