import HttpRequest from './request';

export default class BaseApi {
  static request(options) {
    return HttpRequest(options);
  }

//   static proxy(options) {
//     // options.url = `http://127.0.0.1:7001${options.url}`;
//     return HttpRequest({
//       ...options
//     //   ...{
//     //     proxy: proxyName
//     //   }
//     });
//   }

//   static get proxyName() {
//     return process.env.proxyName;
//   }
}
