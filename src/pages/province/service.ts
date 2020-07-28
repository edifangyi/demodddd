import request from 'umi-request';

export async function queryProvince() {
  return request('/api/manage/queryProvince');
}
