const home = () => import('./home')
const taplab = () => import('./taplab')
const excelParse = () => import('./excelParse')
const inputArea = () => import('./inputArea')
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
        path: '/excelParse',
        name: 'excelParse',
        component: excelParse
    },
    {
        path: '/inputArea',
        name: 'inputArea',
        component: inputArea
    }
]