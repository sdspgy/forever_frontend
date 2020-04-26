<template>
    <div>
        <span class="manage" @click="toManageEvent">管理控制台</span>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component({
        components: {},
    })
    export default class Welcome extends Vue {

        private toManageEvent() {
            this.$router.push({
                name:'advert'
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
