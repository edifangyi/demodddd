import {Effect, Reducer} from 'umi';
import {queryDistrict} from '@/services/district';
import {DistrictItemType} from "@/pages/district/data";


export interface DistrictStateType {
  showList: DistrictItemType[];
}

export interface DistrictModelType {
  namespace: string;
  state: DistrictStateType;
  effects: {
    queryDistrict: Effect;
  };
  reducers: {
    responseDistrict: Reducer<DistrictStateType>;
  };
}

const Model: DistrictModelType = {
  namespace: 'district',

  state: {
    showList: [],
  },

  effects: {
    * queryDistrict(_, {call, put}) {
      const response = yield call(queryDistrict);
      yield put({
        type: 'responseDistrict',
        payload: Array.isArray(response.data) ? response.data : [],
      });
    },
  },

  reducers: {
    responseDistrict(state, {payload}) {
      return {
        ...state,
        showList: payload,
      };
    },
  },
};

export default Model;
