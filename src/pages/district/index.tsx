import React, {FC, useEffect} from 'react';
import {Avatar, Card, Dropdown, List, Menu, Radio, Tag} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {connect, Dispatch} from 'umi';
import {DistrictStateType} from "@/models/district";
import {DistrictItemType} from "@/pages/district/data";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

interface BasicListProps {
  dispatch: Dispatch<any>;
  listAndsearchAndarticles: DistrictStateType;
  listLoading: boolean;
}

export const BasicList: FC<BasicListProps> = ({dispatch, listAndsearchAndarticles: {showList}, listLoading}) => {
  /**
   * 网络请求
   */
  useEffect(() => {
    dispatch({
      type: 'district/queryDistrict',
    });
  }, []);

  const extraContent = (
    <RadioGroup defaultValue="all">
      <RadioButton value="all">全部</RadioButton>
      <RadioButton value="complete">完成</RadioButton>
      <RadioButton value="progress">进行中</RadioButton>
      <RadioButton value="waiting">等待中</RadioButton>
    </RadioGroup>
  );

  /**
   * 更多按钮
   * @param item
   * @constructor
   */
  const MoreBtn: React.FC<{
    item: DistrictItemType;
  }> = ({item}) => (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key="edit">编辑</Menu.Item>
          <Menu.Item key="delete">置顶</Menu.Item>
        </Menu>
      }
    >
      <a>
        更多 <DownOutlined/>
      </a>
    </Dropdown>
  );
  /**
   * ListItem 条目内容显示
   * @param item
   * @constructor
   */
  const ListContent: React.FC<{
    item: DistrictItemType;
  }> = ({item}) => (
    <div>
      <Tag color="success">{item.status}</Tag>
      <Tag color="processing">{item.area}</Tag>
    </div>
  );

  return (
    <div>
      <PageHeaderWrapper>
        <Card
          bordered={false}
          title="基本列表"
          style={{marginTop: 24}}
          bodyStyle={{padding: '0 32px 40px 32px'}}
          extra={extraContent}>
          <List
            size="large"
            loadMore={false}
            footer
            rowKey="id"
            loading={listLoading}
            dataSource={showList}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <MoreBtn key="more" item={item}/>
                ]}>
                <List.Item.Meta
                  avatar={<Avatar src={item.logo} shape="circle" size="large"/>}
                  title={item.title}
                  description={item.update_time}
                />
                <ListContent item={item}/>
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
     listAndsearchAndarticles, loading
   }: {
    listAndsearchAndarticles: DistrictStateType;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    listAndsearchAndarticles,
    listLoading: loading.effects['district/queryDistrict']
  }),
)(BasicList);
