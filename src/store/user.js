import { adminLogin } from '../api/login'
import { setToken, getToken, removeToken} from '@/utils/auth'


export default {
  state: {
    token: getToken()
  },
  mutations: {
    SET_TOKEN:(state, token) => {
      state.token = token
  }
  },
  actions: {

    // 用户登录
    adminLogin({ commit }, info) {
      return new Promise((resolve, reject) => {
        adminLogin(info).then(response => {
              console.log(response);
              if(response.data.state === 1) {
                  const { data } = response;
                  commit('SET_TOKEN', data.token);
                  setToken(data.token);
                  resolve();
                  console.log('走到了这');
              } else {
                  reject();
              }
              
          }).catch(error => {
              reject(error);
          })
      })
  },

  // 用户注销
  logout({ commit }) {
    return new Promise((resolve) => {
      commit('SET_TOKEN', '');
      removeToken();
      resolve()
    })
  }
  },
  modules: {}
};
