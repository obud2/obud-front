import CodeService from './CodeService';
import InfoService from './InfoService';

const getRootItem = () => {
  return new Promise((resolve) => {
    const API = [CodeService.getItem('product-class-setting'), InfoService.info('info')];

    Promise.all(API).then((res) => {
      resolve({
        code: res?.[0] || {},
        info: res?.[1] || {},
      });
    });
  });
};

const RootService = {
  getRootItem,
};

export default RootService;
