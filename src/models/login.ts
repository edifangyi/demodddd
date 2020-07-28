import {stringify} from 'querystring';
import {history, Reducer, Effect} from 'umi';

import {fakeAccountLogin} from '@/services/login';
import {setAuthority} from '@/utils/authority';
import {getPageQuery} from '@/utils/utils';

import {setToken} from "@/utils//cookies";

export interface LoginModelStateType {
  code?: string;
  msg?: string;
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface LoginModelType {
  namespace: string;
  state: LoginModelStateType;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<LoginModelStateType>;
  };
}

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    code: '',
    msg: '',
    type: ''
  },

  effects: {
    * login({payload}, {call, put}) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.code === '2000') {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let {redirect} = params as { redirect: string };

        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }
        history.replace(redirect || '/');
      }
    },

    logout() {
      // Note: There may be security issues, please note
      if (window.location.pathname !== '/login') {
        history.replace({
          pathname: '/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },

  reducers: {
    changeLoginStatus(state, {payload}) {
      if (payload !== null) {
        setAuthority(payload.data.currentAuthority);
        setToken(payload.data.token)
        return {
          ...state,
          type: payload.data.type,
          code: payload.code,
          msg: payload.msg,
        };
      } else {
        return {
          ...state
        }
      }
    },
  },
};

export default Model;
