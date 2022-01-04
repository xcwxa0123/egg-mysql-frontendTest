const home = () => import('./home')
const taplab = () => import('./taplab')
const toolPage = () => import('./toolPage')
export default [
    {
        path: '/home',
        name: 'home',
        component: home
    },
    {
        path: '/taplab',
        name: 'taplab',
        component: taplab
    },
    {
        path: '/toolPage',
        name: 'toolPage',
        component: toolPage
    }
]