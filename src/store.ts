import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import router from './router'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        userName: (localStorage.getItem('userName')===null) ?  'Používateľ' : localStorage.getItem('userName'),
        isLogged: (localStorage.getItem('isLogged')===null || localStorage.getItem('isLogged')=="false") ?  false : true,
        userToken: (localStorage.getItem('userToken')===null) ?  '' : localStorage.getItem('userToken'),
        userId: (localStorage.getItem('userId')===null) ?  '' : localStorage.getItem('userId')
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
            localStorage.setItem('isLogged', "true");
        },
        setLoggedFalse(state) {
            state.isLogged = false;
            localStorage.setItem('isLogged', "false");
        },
        setToken(state, token: string) {
            state.userToken = token;
            localStorage.setItem('userToken', state.userToken);
        },
        setUserName(state, name: string) {
            state.userName = name;
            localStorage.setItem('userName', state.userName);
        },
        setUserId(state, id: string) {
            state.userId = id;
            localStorage.setItem('userId', state.userId);
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
            .catch(() => {
                context.commit('setToken', '');
                context.commit('setUserName', 'Používateľ');
                context.commit('setUserId', '');
                context.commit('setLoggedFalse');
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
            .then(() => {
                alert('Podujate bolo úspešne pridané');
            })
            .catch(e =>{
                alert(e);
            })
        }
    }
});

export default store