import request from 'umi-request';

export async function queryDistrict() {
  return request('/api/manage/queryDistrict');
}
