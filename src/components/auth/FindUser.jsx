import React from 'react';

import { SFindUser } from './FindUser.styled';

import TabPanel from '@components/tabPanel/TabPanel';
import FindId from './FindId';
import FindPwd from './FindPwd';

const TAB = [
  { id: 'find-id', label: '아이디 찾기' },
  { id: 'find-pwd', label: '비밀번호 찾기' },
];

const FindUser = ({ type, onClickOpenAuth }) => {
  const onClickTabValue = (e) => {
    onClickOpenAuth(e);
  };

  return (
    <SFindUser>
      <div className="find-user-tab">
        {TAB?.map((item) => (
          <button
            key={item?.id}
            className={`find-user-tab-button ${item?.id === type ? 'active' : ''}`}
            onClick={() => onClickTabValue(item?.id)}
          >
            {item?.label || ''}
          </button>
        ))}
      </div>

      <div className="find-user-container">
        <TabPanel value={type} index="find-id">
          <FindId onClickOpenAuth={onClickOpenAuth} />
        </TabPanel>

        <TabPanel value={type} index="find-pwd">
          <FindPwd onClickOpenAuth={onClickOpenAuth} />
        </TabPanel>
      </div>
    </SFindUser>
  );
};

export default FindUser;
