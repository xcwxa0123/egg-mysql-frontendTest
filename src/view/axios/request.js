// import Cookies from 'js-cookie';
import Axios from 'axios';
// import YjyWebCrypto from 'yjy-web-crypto';
// import UuidV4 from 'uuid/v4';
// Axios.defaults.withCredentials = true
const instance = Axios.create({
  // baseURL: '127.0.0.1:7001', // api 的 SERVER_HOST
  withCredentials: true,
  crossDomain: true,
  timeout: 60000, // request timeout
  // proxy: {
  //   '/getUser': 'http://127.0.0.1:7001/getUser'
  // }
});
// request interceptor
instance.interceptors.request.use(
  config => {
    if (config.validate !== false) {
      // let countbuParams = null;
      // if (window._dctc) {
      //   const countubConfig = window._dctc || {};
      //   countbuParams = {
      //     'countub-companynum': countubConfig.companynum,
      //     'countub-page': countubConfig.page,
      //     'countub-business': countubConfig.business
      //   };
      // }
      //生产环境，走中转的接口请求均需增加/Views/PC的路径
      // let includeApi = ['innersaleworkapi','contractworkapi','customerworkapi','kehuworkapi']
      // let isadd = true
      // includeApi.map(val=>{ 
      //   if(config.url.indexOf(val) > -1){
      //     return isadd = false
      //   }
      // })
      // console.log(isadd)
      // if (window.location.port === '' && isadd) {
      //   config.url = `/Views/PC${config.url}`;
      // }

      config.headers = {
        ...config.headers,
        ...{
          'X-Requested-With': 'XMLHttpRequest',
          'Access-Control-Allow-Origin': true
          // [process.env.security.csrf.headerName]: Cookies.get(
          //   process.env.security.csrf.cookieName
          // )
        },
        // ...countbuParams
      };
    }

    // config.params = {
    //   ...config.params,
    //   ...{
    //     referer: window.referer || '', //（！！不要删除）
    //   }
    // };
    if (config.method.toLowerCase() === "post") {
      config.data = {
        data: JSON.stringify(config.data),
      }
    }
    return config;
  },
  error => {
    // Do something with request error
    console.error(error); // for debug
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    
    const {
      config
    } = response;
    if (config.responseType === 'blob') return response;

    try {
      const {
        meta,
        data
      } = response.data;
      // if (meta.timestamp) {
      return {
        meta,
        data: JSON.parse(data)
      };
      // }
    } catch (error) {
      return response;
    }
  },
  error => {
    switch (error.response.status) {
      case 401: {
        const {
          data
        } = error.response.data || {};
        if (data) {
          window.location.href = data;
        }
        break;
      }
      default:
        break;
    }
    return {
      meta: {
        code: 0,
        message: error.response.message
      }
    };
  }
);
export default instance;