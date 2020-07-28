import {Alert} from 'antd';
import React, {useState} from 'react';
import {connect, Dispatch} from 'umi';
import {LoginModelStateType} from '@/models/login';
import {LoginParamsType} from '@/services/login';
import LoginForm from './components/Login';

import styles from './style.less';

const {UserName, Password, Submit, Tab} = LoginForm;

interface LoginProps {
  dispatch: Dispatch;
  userLogin: LoginModelStateType;
  submitting?: boolean;
}

const LoginMessage: React.FC<{
  content: string;
}> = ({content}) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC<LoginProps> = (props) => {
  const {userLogin: {code, type: loginType, msg}, submitting} = props;
  const [type, setType] = useState<string>('account');

  const handleSubmit = (values: LoginParamsType) => {
    const {dispatch} = props;
    dispatch({
      type: 'login/login',
      payload: {...values, type},
    });
  };
  return (
    <div className={styles.main}>
      <LoginForm activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
        <Tab key="account" tab="">
          {code !== '2000' && loginType === 'account' && !submitting && (<LoginMessage content={`${msg}`}/>)}
          <UserName
            name="userName"
            placeholder="用户名: admin or user"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          />
          <Password
            name="password"
            placeholder="密码"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
        </Tab>
        <Submit loading={submitting}>登录</Submit>

      </LoginForm>
    </div>
  );
};

export default connect(({login, loading}: {
  login: LoginModelStateType;
  loading: {
    effects: { [key: string]: boolean };
  };
}) => ({
  userLogin: login,
  submitting: loading.effects['login/login2'],
}))(Login);
