import React, { useEffect, useMemo } from 'react';

import { getUserId, userLogout } from 'src/constants';

import { useQuery } from 'react-query';
import UserService from 'src/service/UserService';

type User = {
  createdAt: string,
  updatedAt: string,
  id: string,
  email: string,
  apple: string,
  google: string,
  kakao: string,
  naver: string,
  name: string,
  phone: string,
  birthDate: string,
  userGroup: string,
  gender: string,
  role: string,
  status: string,
  address: string,
  addressDetail: string,
  viewCount: number,
  visitCount: number,
  sortOrder: number,
  isDeleted: string,
  isShow: string,
  uploadKey: string,
}

export const UserContext = React.createContext<{
  user: User & { isSns: boolean; snsType: 'KAKAO_SNS' | 'GOOGLE_SNS' | 'NAVER_SNS' | 'APPLE_SNS'; } | null;
  isLoading: boolean;
  editUser:(param: EditUserParams) => Promise<{status: number; value: User, message: string}>
// eslint-disable-next-line @typescript-eslint/no-empty-function
}>({ user: null, isLoading: true, editUser: () => Promise.resolve({} as any) });

type EditUserParams = {
  id: string;
  name?: string;
  hp?: string;
  password?: string;
  adr?: string;
  adrDetail?: string;
  birthdate?: string;
  gender?: string;
};
/**
 *
 * @param {*} param0
 * @returns 사용자 정보 관리
 */
const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const userId = getUserId();

  const fetchData = async () => {
    const res: User & { isSns: boolean; snsType: 'KAKAO_SNS' | 'GOOGLE_SNS' | 'NAVER_SNS' | 'APPLE_SNS' } = await UserService.getUser(userId);

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

  const editUser = async (param: EditUserParams) => {
    const res = await UserService.setUser('edit', param);

    if (param?.password) {
      await UserService.changePassword(userId, param?.password);
    }

    await refetch();
    return res;
  };

  const value = useMemo(
    () => ({
      user: user ?? null,
      isLoading,
      editUser,
    }),
    [user, isLoading],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
