const login = r => require.ensure([], () => r(require('./login.vue')), 'login');
// TODO 可尝试加校验，如果校验不通过则跳回login，参考AOS
export default [
    {
        path: '/',
        redirect: { name: 'login' },
    },
    {
        path: '/login',
        name: 'login',
        component: login
    }
]