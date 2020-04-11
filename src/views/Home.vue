<style>
    .des{
        font-size: 18px;
    }
    .des::before{
        content:'\260E';
        font-size: 15px;
    }
    .des::after{
        content:'x';
        background-color: red;
    }
</style>

<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <div class="des">sdsdsd</div>
        <HelloWorld msg="Welcome to Your Vue.js App"/>
        <TitleHead :name="nameValue"/>
    </div>
</template>

<script>
    // @ is an alias to /src
    import HelloWorld from '@/components/HelloWorld.vue'
    import TitleHead from '@/components/TitleHead.vue'

    export default {
        name: 'Home',
        components: {
            HelloWorld,TitleHead
        },
        data() {
            return {
                nameValue: 'forever'
            }
        }
    }
</script>
