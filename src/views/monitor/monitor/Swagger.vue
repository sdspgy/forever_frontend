<template>
    <iframe :style="{height:(this.contentStyleObj.height)}" :src="urlHeard + '/meng/swagger-ui.html'">

    </iframe>
</template>

<script>
    export default {
        name: "swagger",
        data() {
            return {
                contentStyleObj: {
                    height: ''
                },
                urlHeard: ''
            }
        },
        mounted() {
            this.init()
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
            },
            init() {
                this.urlHeard = window.location.origin
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
