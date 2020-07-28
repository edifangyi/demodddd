import React, {FC, useEffect} from 'react';
import {Avatar, Card, List, Radio, Tag} from 'antd';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {connect, Dispatch} from 'umi';
import {ProvinceStateType} from "@/pages/district/model";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

interface BasicListProps {
  dispatch: Dispatch;
  dataSource: ProvinceStateType;
  listLoading: boolean;
}

export const Province: FC<BasicListProps> = (props) => {
  const {
    dispatch,
    dataSource: {code, msg, list},
    listLoading
  } = props;


  const extraContent = (
    <RadioGroup defaultValue="all">
      <RadioButton value="all">全部</RadioButton>
      <RadioButton value="complete">完成</RadioButton>
      <RadioButton value="progress">进行中</RadioButton>
      <RadioButton value="waiting">等待中</RadioButton>
    </RadioGroup>
  );

  /**
   * 网络请求
   */
  useEffect(() => {
    dispatch({
      type: 'province/queryProvince',
    });
  }, []);

  return (
    <div>
      <PageHeaderWrapper>
        <Card
          bordered={false}
          title="省级融媒体平台"
          style={{marginTop: 24}}
          bodyStyle={{padding: '0 32px 40px 32px'}}
          extra={extraContent}>

          <Tag>{code}</Tag>
          <Tag>{msg}</Tag>
          <Tag>{list}</Tag>

          <List
            size="large"
            loadMore={false}
            footer
            rowKey="id"
            loading={listLoading}
            dataSource={list}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.logo} shape="circle" size="large"/>}
                  title={item.title}
                  description={item.update_time}
                />
              </List.Item>
            )}
          />
        </Card>
      </PageHeaderWrapper>

    </div>
  );
};


export default connect(
  ({
     dataSource, loading
   }: {
    dataSource: ProvinceStateType;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    dataSource,
    listLoading: loading.effects['province/queryProvince']
  }),
)
(Province);
