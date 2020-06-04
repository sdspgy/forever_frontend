<template>
    <div class="advert" :style="{height:(this.contentStyleObj.height)}">

    </div>
</template>

<script>

    export default {
        name: "advert",
        data() {
            return {
                contentStyleObj: {
                    height: ''
                },
            }
        },
        created() {
            window.addEventListener('resize', this.getHeight);
            this.getHeight()
        },
        destroyed() {
            //清除定时器
            clearInterval(this.realTime);
            window.removeEventListener('resize', this.getHeight)
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {

            },
            getHeight() {
                this.contentStyleObj.height = window.innerHeight - 130 + 'px';
            }
        }
    }
</script>

<style scoped>
    .advert {
        width: 100%;
        background-color: #f9f9f9;
    }

</style>
