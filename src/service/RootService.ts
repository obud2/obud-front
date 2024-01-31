import { info } from './InfoService';
import { getItem } from '@/service/CodeService';

export const getRootItem = () => {
  return new Promise((resolve) => {
    const API = [getItem('product-class-setting'), info('info')];

    Promise.all(API).then((res) => {
      resolve({
        code: res?.[0] || {},
        info: res?.[1] || {},
      });
    });
  });
};
