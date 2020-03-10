<template>
    <div class="titleHead">{{name}}</div>
</template>

<script>
    export default {
        name: "TitleHead",
        props: {
            name: String,
            required: true
        },
        components: {},
        data() {
            return {}
        },
        mounted() {

        },
        methods: {}
    }
</script>

<style scoped>
    .titleHead {
        width: 100%;
        height: 50px;
        margin-bottom: 1px;
        padding-left: 20px;
        background-color: #fff;
        border-radius: 10px 10px 0 0;
        border-bottom: 1px solid #FAFAFA;
        font-size: 14px;
        font-weight: bold;
        line-height: 50px;
    }
</style>
