import * as types from "./actionType";
import axios from "axios";

const getUsers = (users) => ({
    type: types.GET_USERS,
    payload: users,
});

const userDeleted = () => ({
    type: types.DELETE_USER,
});

const userAdded = () => ({
    type: types.ADD_USER,
});

const getUser = (user) => ({
    type: types.GET_SINGLE_USER,
    payload: user,
});

const userUpdated = () => ({
    type: types.UPDATE_USER,
});

export const sortUsersDesc = () => ({
    type: types.SORT_USERS_DESC,
});

export const sortUsersAsc = () => ({
    type: types.SORT_USERS_ASC,
});

export const sortDateDesc = () => ({
    type: types.SORT_DATE_DESC,
});

export const sortDateAsc = () => ({
    type: types.SORT_DATE_ASC,
});

export const filterUsersByRole = (role) => ({
    type: types.FILTER_USERS_ROLE,
    payload: role
});

export const filterUsersByStatus = (isArchive) => ({
    type: types.FILTER_USERS_STATUS,
    payload: isArchive
});

export const loadUsers = () => {
    return function (dispatch) {
        axios
        .get(`${process.env.REACT_APP_API}`)
        .then((resp) => {
            console.log("resp", resp)
            dispatch(getUsers(resp.data.user));
        })
        .catch((error) => console.log(error));
    };
};

export const deleteUser = (id) => {
    return function (dispatch) {
        axios
        .delete(`${process.env.REACT_APP_API}/${id}`)
        .then((resp) => {
            console.log("resp", resp)
            dispatch(userAdded());
            dispatch(loadUsers());
        })
        .catch((error) => console.log(error));
    };
};

export const addUser = (user) => {
    return function (dispatch) {
        axios
        .post(`${process.env.REACT_APP_API}`, user)
        .then((resp) => {
            console.log("resp", resp)
            dispatch(userDeleted());
            dispatch(loadUsers());
        })
        .catch((error) => console.log(error));
    };
};

export const getSingleUser = (id) => {
    return function (dispatch) {
        axios
        .get(`${process.env.REACT_APP_API}/${id}`)
        .then((resp) => {
            console.log("resp", resp)
            dispatch(getUser(resp.data));
        })
        .catch((error) => console.log(error));
    };
};

export const updateUser = (user, id) => {
    return function (dispatch) {
        axios
        .put(`${process.env.REACT_APP_API}/${id}`, user)
        .then((resp) => {
            console.log("resp", resp)
            dispatch(userUpdated());
        })
        .catch((error) => console.log(error));
    };
};