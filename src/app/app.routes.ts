import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Layout } from './pages/layout/layout';
import { Users } from './pages/users/users';
import { MedicineMaster } from './pages/medicine-master/medicine-master';
import { RegisterPatient } from './pages/patient/register-patient/register-patient';
import { PatientList } from './pages/patient/patient-list/patient-list';

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
            }
        ]
    }
];
