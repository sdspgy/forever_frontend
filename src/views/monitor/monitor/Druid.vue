<template>
    <iframe :style="{height:(this.contentStyleObj.height)}" src="http://10.2.10.41:1199/meng/druid">

    </iframe>
</template>

<script>
    export default {
        name: "Druid",
        data() {
            return {
                contentStyleObj: {
                    height: ''
                }
            }
        },
        created() {
            window.addEventListener('resize', this.getHeight);
            this.getHeight()
        },
        destroyed() {
            window.removeEventListener('resize', this.getHeight)
        },
        methods: {
            getHeight() {
                this.contentStyleObj.height = window.innerHeight - 130 + 'px';
            }
        }
    }
</script>

<style scoped>
    iframe {
        width: 100%;
        background-color: #f9f9f9;
    }
</style>
