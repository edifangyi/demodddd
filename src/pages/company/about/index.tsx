import React, {Component} from 'react';
import {Card, Descriptions} from 'antd';
import {PageHeaderWrapper} from '@ant-design/pro-layout';


class About extends Component {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <PageHeaderWrapper content="">
        <Card title="关于我们" style={{marginBottom: 24}} bordered={false}>
          <Descriptions style={{marginBottom: 24}}>
            <Descriptions.Item label="名称">重庆广大融媒科技有限公司</Descriptions.Item>
            <Descriptions.Item label="联系方式">13220207320</Descriptions.Item>
            <Descriptions.Item label="公司官网">www.gdrm.com</Descriptions.Item>
            <Descriptions.Item label="地址">重庆市渝北区仙桃街道同茂大道416号重庆新闻传媒总部大厦1幢3203号</Descriptions.Item>
          </Descriptions>
        </Card>

      </PageHeaderWrapper>
    );
  }
}

export default About;
