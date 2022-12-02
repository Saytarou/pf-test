import * as types from "./actionType";
import { toDate, isAfter, isBefore } from "date-fns";

const initialState = {
    users: [],
    user: {},
    loading: true
}

const usersReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_USERS:
            return {
                ...state,
                allUsers: action.payload,
                users: action.payload,
                loading: false
            };
        case types.DELETE_USER:
        case types.ADD_USER:
        case types.UPDATE_USER:
            return {
                ...state,
                loading: false,
            };
            case types.GET_SINGLE_USER:
                return {
                    ...state,
                    user: action.payload,
                    loading:false,
                };
        case types.SORT_USERS_DESC:
            return {
                ...state,
                users: [...state.users].sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
            }
        case types.SORT_USERS_ASC:
            return {
                ...state,
                users: [...state.users].sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()))
            }
        case types.SORT_DATE_DESC:
            return {
                ...state,
                users: [...state.users].sort((a, b) => {
                    const [aDay, aMonth, aYear] = a.birthday.split('.')
                    const [bDay, bMonth, bYear] = b.birthday.split('.')
                    const aDate = toDate(new Date(aYear, Number(aMonth - 1), aDay))
                    const bDate = toDate(new Date(bYear, Number(bMonth - 1), bDay))
                    return isAfter(aDate, bDate) ? 1 : -1;
                })
            }
        case types.SORT_DATE_ASC:
            return {
                ...state,
                users: [...state.users].sort((a, b) => {
                    const [aDay, aMonth, aYear] = a.birthday.split('.')
                    const [bDay, bMonth, bYear] = b.birthday.split('.')
                    const aDate = toDate(new Date(aYear, Number(aMonth - 1), aDay))
                    const bDate = toDate(new Date(bYear, Number(bMonth - 1), bDay))
                    return isBefore(aDate, bDate) ? 1 : -1;
                           
                })
            }
        case types.FILTER_USERS_STATUS:
            return {
                ...state,
                users: state.allUsers.filter(user => user.isArchive === action.payload)
            }
        case types.FILTER_USERS_ROLE:
            return {
                ...state, 
                users: state.allUsers.filter(user => user.role === action.payload)
            }
        default:
            return state;
    }
};

export default usersReducers;