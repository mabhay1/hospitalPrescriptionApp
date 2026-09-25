import { Gender, Role, VisitStatus } from "../enum/Role.enum";

export const GlobalConstant = {
    API_METHODS:{
        LOGIN:'login',
        CREATE_USER: 'staff',
        FILTER_USER: 'staff?roleName=',
        GET_ALL_MEDICINES:'medicines',
        GET_MEDICINE_BY_ID:'medicines/',
        FILTER_MEDICINE:'medicines?search=',
        GET_ALL_PATIENTS:'patients',
        GET_PATIENT_BY_ID:'patients/',
        GET_ALL_VISITS:'visits',
        GET_VISITS_BY_PATIENT_ID:'visits/patient/',
        ADD_PRESCRIPTION_ITEM:'prescription-items',
    },
    LOGIN_USER_SESSION_KEY:'hospitalUser',
    LOGIN_TOKEN_SESSION_KEY:'hospitalUserToken',
    ROLE_LIST:[Role.ADMIN,Role.DOCTOR,Role.RECEPTIONIST],
    MEDICINE_FORM_LIST:['Tablet','Capsule','Syrup','Injection'],
    GENDER_LIST:[Gender.MALE,Gender.FEMALE],
    VISIT_STATUS_LIST:[VisitStatus.CURRENT,VisitStatus.FOLLOWUP,VisitStatus.CLOSED]

}