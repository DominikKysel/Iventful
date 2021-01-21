import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import router from './router'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        userName: 'Používateľ',
        isLogged: false,
        userToken: '',
        userId: ''
    },
    getters: {
        isLogged(state) {
            return state.isLogged;
        },
        getToken(state) {
            return state.userToken;
        },
        getUserName(state) {
            return state.userName;
        },
        getUserId(state) {
            return state.userId;
        }
    },
    mutations: {
        setLoggedTrue(state) {
            state.isLogged = true;
        },
        setLoggedFalse(state) {
            state.isLogged = false;
        },
        setToken(state, token: string) {
            state.userToken = token;
        },
        setUserName(state, name: string) {
            state.userName = name;
        },
        setUserId(state, id: string) {
            state.userId = id;
        }
    },
    actions: {
        login(context, payload) {
            axios
            .post('http://localhost:8000/api/v1/auth/login',{
                "email": payload.email,
                "password": payload.password
                }
            )
            .then(response => {
                    context.commit('setToken', response.data.token);
                    context.commit('setUserName', response.data.user.name);
                    context.commit('setUserId', response.data.user.id);
                    context.commit('setLoggedTrue');  
                }         
            )
            .catch(e => {
                alert(e);
            })
        },
        signup(context, payload) {
            axios
            .post('http://localhost:8000/api/v1/auth/signup',{
                "name": payload.name,
                "email": payload.email,
                "password": payload.password,
                "confirm_password": payload.confirmPassword
                }
            )
            .then(response => {
                    context.commit('setToken', response.data.token);
                    context.commit('setUserName', response.data.user.name);
                    context.commit('setUserId', response.data.user.id);
                    context.commit('setLoggedTrue');  
                }         
            )
            .catch(e => {
                alert(e);
            })
        },
        logout(context, payload) {
            const token = payload.token;
            axios
            .post('http://localhost:8000/api/v1/auth/logout',{}, {headers: {
                    Authorization: `Bearer ${token}`
                    }
                }
            )
            .then( () => {
                    context.commit('setToken', '');
                    context.commit('setUserName', 'Používateľ');
                    context.commit('setUserId', '');
                    context.commit('setLoggedFalse');
                    router.push("/");
                } 
            )
            .catch(e => {
                alert(e);
                router.push("/");
            })
        },
        addEvent(context, payload) {
            const token = payload.token;
            console.log(payload);
            axios
            .post('http://localhost:8000/event',payload.event,
            {
                headers: {
                        Authorization: `Bearer ${token}`
                        }
            })
            .then(response => {
                alert('Podujate bolo úspešne pridané');
            })
            .catch(e =>{
                alert(e);
            })
        }
    }
});

export default store