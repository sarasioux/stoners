import { create } from 'ipfs-http-client';
const ipfsApiUrl = 'https://ipfs.infura.io:5001';
const ipfsWebUrl = 'http://ipfs.infura.io/ipfs/';

export default {
  install: (app) => {
    app.config.globalProperties.$ipfs = create(ipfsApiUrl);
    app.config.globalProperties.$ipfsUrl = ipfsWebUrl;
  }
};
