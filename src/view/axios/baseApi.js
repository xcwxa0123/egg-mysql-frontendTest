import BaseApi from './base';

export default class PageBaseApi extends BaseApi {
  static async proxyGet(proxyUrl, data, headersOption) {
    return this.request({
      url: proxyUrl,
      method: 'get',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        ...headersOption,
      },
      responseType: headersOption && headersOption.responseType ? headersOption.responseType : '',
      params: data || {},
    });
  }
  static proxyPost(proxyUrl, data, headersOption) {
    return this.request({
      url: proxyUrl,
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        ...headersOption,
      },
      responseType: headersOption && headersOption.responseType ? headersOption.responseType : '',
      data: data || {},
    });
  }
}