import Vue from 'vue'
import {getStore} from '@/store/storage'

function checkJurisdiction(key: string) {
    // 权限数组
    let jurisdictionList = getStore("perms");
    let index = jurisdictionList.indexOf(key);
    if (index > -1) {
        // 有权限
        return true
    } else {
        // 无权限
        return false
    }
}

// 优雅操作 - VUE自定义指令
export default Vue.directive('permission', {
    inserted(el, binding) {
        // inserted → 元素插入的时候
        let permission = binding.value // 获取到 v-permission的值
        if (permission) {
            let hasPermission = checkJurisdiction(permission)
            if (!hasPermission) {
                // 没有权限 移除Dom元素
                el.parentNode && el.parentNode.removeChild(el)
            }
        } else {
            throw new Error('需要传key')
        }
    }
})
