import {Request, Response} from 'express';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 支持值为 Object 和 Array
  'GET /api/manage/currentUser': {
    code: '2000',
    msg: "成功",
    data: {
      name: 'Serati Ma',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      userid: '00000001',
      email: 'antdesign@alipay.com',
      signature: '海纳百川，有容乃大',
      title: '交互专家',
      group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
      tags: [
        {
          key: '0',
          label: '很有想法的',
        },
        {
          key: '1',
          label: '专注设计',
        },
        {
          key: '2',
          label: '辣~',
        },
        {
          key: '3',
          label: '大长腿',
        },
        {
          key: '4',
          label: '川妹子',
        },
        {
          key: '5',
          label: '海纳百川',
        },
      ],
      notifyCount: 12,
      unreadCount: 11,
      country: 'China',
      geographic: {
        province: {
          label: '浙江省',
          key: '330000',
        },
        city: {
          label: '杭州市',
          key: '330100',
        },
      },
      address: '西湖区工专路 77 号',
      phone: '0752-268888888',
    }
  },
  // GET POST 可省略
  'GET /api/manage/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  'POST /api/manage/login': (req: Request, res: Response) => {
    const {password, userName, type} = req.body;
    if (password === 'admin' && userName === 'admin') {
      res.send({
        code: '2000',
        msg: "成功",
        data: {
          token: 'waefiuhweaewg',
          type,
          currentAuthority: 'admin',
        },
      });
      return;
    }
    if (password === 'user' && userName === 'user') {
      res.send({
        code: '2000',
        msg: "成功",
        data: {
          token: 'waefiuhweaewg',
          type,
          currentAuthority: 'admin',
        }
      });
      return;
    }
    if (password === 'admin' && userName === 'user') {
      res.send({
        code: '2001',
        msg: "Token失效，请重新登录",
        data: {
          type,
          currentAuthority: '',
        }
      });
      return;
    }

    res.send({
      code: '2003',
      msg: "暂无此用户",
      data: {
        type,
        currentAuthority: '',
      },
    });
  },
};
