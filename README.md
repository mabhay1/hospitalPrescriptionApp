# CarePoint - Hospital Prescription System

Angular 22 application for patient management, doctor registration,
appointment booking and digital prescriptions, with role-based access.

## Live Demo
https://hospital-prescription-app.vercel.app/login

### Demo credentials
| Role | Email | Password |
|------|-------|----------|
| Doctor | ajay@gmail.com | 1122 |
| Receptionist | karisma@gmail.com | 123456 |
| Super Admin | superadmin@gmail.com | admin |

## Features
- Role-based login (Doctor, Receptionist, Super Admin)
- Dashboard with sidebar navigation
- Staff management and doctor registration
- Patient management with patient information view
- Appointment booking
- Medicine management
- Visit history with status (FollowUp, Closed) and visit details
- Digital prescriptions: add medicine, dosage, frequency, duration and instructions
- Prescription list for each visit

## Tech Stack
Angular 22, TypeScript, Signals, RxJS, Reactive Forms,
Template-driven Forms, Signal Forms, Bootstrap, CSS3

## Run Locally
```bash
npm install
ng serve
```
Open http://localhost:4200/

## Run Tests
```bash
ng test
```
