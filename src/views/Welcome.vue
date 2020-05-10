<template>
    <div>
        <span class="manage" @click="toManageEvent">管理控制台</span>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {login} from '@/axios/api';
    import util from '../common/utiles'

    @Component({
        components: {},
    })
    export default class Welcome extends Vue {

        private toManageEvent() {
            let params = {
                username: 'admin',
                password: '123456'
            }
            login(params).then(res => {
                if (res.code === 200) {
                    this.setStore('token', res.token);
                    this.setStore('userId', res.userId);
                    util.initRouter(this);
                    this.$router.push({
                        name: 'advert'
                    })
                }
            })
        }

    }
</script>

<style lang="scss">
    .manage {
        width: 30px;
        height: 30px;
    }
</style>
