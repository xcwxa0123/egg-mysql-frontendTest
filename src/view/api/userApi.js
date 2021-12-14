import BaseApi from '../axios/baseApi.js';

export default  class analysisApi extends BaseApi {
    static async getUser(params) {
        return this.proxyPost('/api/getUser', params)
    }

    static async postTest(params) {
        return this.proxyPost('/api/postTest', params)
    }
    static async setSQL(params){
        return this.proxyPost('/api/setSQL', params)
    }

    static async getDatabaseTree(params){
        return this.proxyGet('/api/getDatabaseTree', params)
    }

    static async getTableData(params){
        return this.proxyPost('/api/getTableData', params)
    }

    static async transaction(params){
        return this.proxyPost('/api/transaction', params)
    }
    static async signUp(params){
        return this.proxyPost('/api/signUp', params)
    }
}
