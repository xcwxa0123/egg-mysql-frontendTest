const home = () => import('./home')
const taplab = () => import('./taplab')
const excelParse = () => import('./excelParse')
const inputArea = () => import('./inputArea')
const arm2js = () => import('./arm2js')
const luckySheetTest = () => import('./luckySheetTest')
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
    },
    {
        path: '/arm2js',
        name: 'arm2js',
        component: arm2js
    },
    {
        path: '/luckySheetTest',
        name: 'luckySheetTest',
        component: luckySheetTest
    }
]