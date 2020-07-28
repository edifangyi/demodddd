// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 支持值为 Object 和 Array
  'GET /api/manage/queryProvince': {
    code: '2000',
    msg: "成功",
    data: [
      {
        id: "fake-list-0",
        title: "江津区融媒体中心",
        logo: "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
        update_time: "更新时间 2020-07-28",
        area: "都市区",
        status: "1",
      }
    ]
  },

};
