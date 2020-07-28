import {Effect, Reducer} from 'umi';
import {queryProvince} from "@/pages/province/service";
import {ProvinceItemType} from "@/pages/province/data";


export interface ProvinceStateType {
  code?: string;
  msg?: string;
  list: ProvinceItemType[];
}

export interface DistrictModelType {
  namespace: string;
  state: ProvinceStateType;
  effects: {
    queryProvince: Effect;
  };
  reducers: {
    responseProvince: Reducer<ProvinceStateType>;
  };
}

const Model: DistrictModelType = {
  namespace: 'province',

  state: {
    code: "",
    msg: '',
    list: [],
  },

  effects: {
    * queryProvince(_, {call, put}) {
      const response = yield call(queryProvince);
      yield put({
        type: 'responseProvince',
        payload: response,
        // payload: Array.isArray(response.data) ? response.data : [],
      });
    },
  },

  reducers: {
    responseProvince(state, {payload}) {
      return {
        ...state,
        code: payload.code,
        msg: payload.msg,
        list: payload.data,
      };
    },
  },
};

export default Model;
