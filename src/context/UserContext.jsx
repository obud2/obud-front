import React, { useEffect, useMemo } from 'react';

import { getUserId, userLogout } from 'src/constants';

import { useQuery } from 'react-query';
import UserService from 'src/service/UserService';

export const UserContext = React.createContext({ user: {} });

/**
 *
 * @param {*} param0
 * @returns 사용자 정보 관리
 */
const UserProvider = ({ children }) => {
  const userId = getUserId();

  const fetchData = async () => {
    const res = await UserService.getUser(userId);

    if (res?.kakao || res?.google || res?.naver || res?.apple) {
      res.isSns = true;
    }

    if (res?.kakao) {
      res.snsType = 'KAKAO_SNS';
    }
    if (res?.google) {
      res.snsType = 'GOOGLE_SNS';
    }
    if (res?.naver) {
      res.snsType = 'NAVER_SNS';
    }
    if (res?.apple) {
      res.snsType = 'APPLE_SNS';
    }

    return res;
  };

  const {
    data: user,
    isLoading,
    isError,
    refetch,
  } = useQuery(['user-info', userId], fetchData, {
    enabled: !!userId,
  });

  useEffect(() => {
    if (isError) {
      userLogout();
    }
  }, [isError]);

  const editUser = async (param) => {
    try {
      const res = await UserService.setUser('edit', param);

      if (param?.password) {
        await UserService.changePassword(userId, param?.password);
      }

      await refetch();
      return res;
    } catch (error) {
      return error;
    }
  };

  const value = useMemo(
    () => ({
      user,
      isLoading,
      editUser,
    }),
    [user, isLoading],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
