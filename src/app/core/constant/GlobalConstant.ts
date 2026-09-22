import { Role } from "../enum/Role.enum";

export const GlobalConstant = {
    API_METHODS:{
        LOGIN:'login',
        CREATE_USER: 'staff',
        FILTER_USER: 'staff?roleName=',
        GET_ALL_MEDICINES:'medicines',
        GET_MEDICINE_BY_ID:'medicines/',
        FILTER_MEDICINE:'medicines?search='
    },
    LOGIN_USER_SESSION_KEY:'hospitalUser',
    LOGIN_TOKEN_SESSION_KEY:'hospitalUserToken',
    ROLE_LIST:[Role.ADMIN,Role.DOCTOR,Role.RECEPTIONIST],
    MEDICINE_FORM_LIST:['Tablet','Capsule','Syrup','Injection']

}