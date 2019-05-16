import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex);

export default new Vuex.Store({
	state: {
  		status: '',
  		token: localStorage.getItem('token') || '',
  		user : {},
      pages: [],
	},
	mutations: {
		  auth_request(state){
	    	state.status = 'loading'
	  	},
	  	auth_success(state, {token, user}){
		    state.status = 'success';
		    state.token = token;
		    state.user = user;
	  	},
	  	auth_error(state){
	    	state.status = 'error'
	  	},
	  	logout(state){
	    	state.status = '';
        state.token = '';
        state.user = '';
	  	},
      loading_pages(state, pages){
		    state.pages = pages;
      }
	},
	actions: {
	  	login({commit}, user){
	        return new Promise((resolve, reject) => {
	            commit('auth_request');
	            axios({url: `${process.env.API_URL}auth/login/`, data: user, method: 'POST', headers: {
					'content-type': 'application/json',
				} })
	            .then(resp => {
	                const token = resp.data.key;
					const user = resp.data.user;
					localStorage.setItem('token', token);
	                // Add the following line:
	                axios.defaults.headers.common['Authorization'] =  `Token ` + token;
	                commit('auth_success', {user: user, token: token});
	                resolve(resp)
	            })
	            .catch(err => {
	                commit('auth_error');
	                localStorage.removeItem('token');
	                reject(err)
	            })
	        })
	    },
	    register({commit}, user){
	    	return new Promise((resolve, reject) => {
	            commit('auth_request');
	            axios({url: `${process.env.API_URL}register/`, data: user, method: 'POST', headers: {
					'Content-Type': 'application/json'}
				})
	            .then(resp => {
	                const token = resp.data.authToken.key;
	                const user = {
	                  email: resp.data.email,
	                  fullName: resp.data.fullName,
	                  id: resp.data.id,
	                  isSuperuser: resp.data.isSuperuser,
	                  role: resp.data.role,
                  };
					localStorage.setItem('token', token);
	                // Add the following line:
	                axios.defaults.headers.common['Authorization'] =  `Token ` + token;
	                commit('auth_success', {user: user, token: token});
	                resolve(resp)
	            })
	            .catch(err => {
	                commit('auth_error', err);
					localStorage.removeItem('token');
	                reject(err)
	            })
	        })
	    },
	  	logout({commit}){
		    return new Promise((resolve, reject) => {
		    	commit('logout');
		    	axios({url: `${process.env.API_URL}auth/logout/`, method: 'POST',
            headers: {
					'Content-Type': 'application/json'}
				})
	            .then(resp => {
	                localStorage.removeItem('token');
					delete axios.defaults.headers.common['Authorization'];
					resolve()
	            });
		    })
	  	},
      loading_pages({commit}){
	  	  return new Promise((resolve, reject) => {
	  	    axios({url: `${process.env.API_URL}pages/`, method: 'GET', headers: {
					  'Content-Type': 'application/json'}
	  	    })
            .then(resp => {
              const  pages = resp.data;
              localStorage.setItem('pages', pages);
              commit('loading_pages', pages);
              resolve(resp)
            })
            .catch(err => {
              reject(err);
            })
        })
      }
	},
	getters : {
	  isLoggedIn: state => !!state.token,
	  isAdminStatus: state => state.user.isSuperuser,
	  authStatus: state => state.status,
    getPageByAccessUrl: state => url => {
      return state.pages.find(page => page.accessUrl === url);
    }
	}
})
