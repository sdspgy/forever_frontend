import Vue from 'vue'
import {template} from '../router/loadView'

//处理首字母大写 abc=>Abc
function changeStr(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

const requireComponent = require.context('../components', false, /\.vue$/)
//依次组册components包下的组件
export default requireComponent.keys().forEach((filename) => {
    //截取组件名
    const componentName = filename.substring(2, filename.length - 4)
    //引入组件
    const config = template(componentName);
    Vue.component(componentName, config)
})
