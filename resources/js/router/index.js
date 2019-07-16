import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import DashBoard from '../pages/DashBoard';
import UserList from "../pages/user/UserList";

const routes = [
    {
        path: '/',
        name: 'dashboard',
        component: DashBoard
    },
    {
        path: '/users',
        name: 'user.index',
        component: UserList
    },
];

export default new VueRouter({
    mode: 'hash', //history
    routes
});