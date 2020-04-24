<template>
    <div>
        <Menu v-show="!isSmillMenu" :theme="colorType" :open-names="['1']" accordion width="180px">
            <Submenu name="1">
                <template slot="title">
                    <Icon type="ios-paper"/>
                    内容管理
                </template>
                <MenuItem name="1-1">文章管理</MenuItem>
                <MenuItem name="1-2">评论管理</MenuItem>
                <MenuItem name="1-3">举报管理</MenuItem>
            </Submenu>
            <Submenu name="2">
                <template slot="title">
                    <Icon type="ios-people"/>
                    用户管理
                </template>
                <MenuItem name="2-1">新增用户</MenuItem>
                <MenuItem name="2-2">活跃用户</MenuItem>
            </Submenu>
        </Menu>


        <Menu v-show="isSmillMenu" :theme="colorType" accordion width="80px">
            <div>
                <Icon type="ios-paper"/>
            </div>
            <div>
                <Icon type="ios-people"/>
            </div>
        </Menu>

        <header>
            <img class="headImg"
                 src=""></img>
            <Icon class="menuClick" :style="{transform: 'rotateZ(' + (this.isSmillMenu ? '-90' : '0') + 'deg)'}"
                  @click="menuEvent" size="30" type="md-menu"/>
        </header>

        <div class="main" :style="{left:(this.isSmillMenu ? '80' : '180') +'px' }">
            <keep-alive :include="cachePage">
                <router-view></router-view>
            </keep-alive>
        </div>

    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component({
        components: {},
    })

    export default class Manage extends Vue {

        colorType: string = 'light';
        isSmillMenu: boolean = false;
        viewName = 'Home'

        //methods
        private init(): void {
            console.log("this is manage!")
        }

        private menuEvent(): void {
            this.isSmillMenu = !this.isSmillMenu;
            // var divTest = document.getElementById("fullScreen");
            // if(!this.checkFull){
            //     this.launchIntoFullscreen(divTest)
            // }else {
            //     this.exitFullscreen()
            // }
        }

        // launchIntoFullscreen(element) {
        //     if (element.requestFullscreen) {
        //         element.requestFullscreen();
        //     } else if (element.mozRequestFullScreen) {
        //         element.mozRequestFullScreen();
        //     } else if (element.webkitRequestFullscreen) {
        //         element.webkitRequestFullscreen();
        //     } else if (element.msRequestFullscreen) {
        //         element.msRequestFullscreen();
        //     }
        // }
        //
        // exitFullscreen() {
        //     if (document.exitFullscreen) {
        //         document.exitFullscreen();
        //     } else if (document.mozCancelFullScreen) {
        //         document.mozCancelFullScreen();
        //     } else if (document.webkitExitFullscreen) {
        //         document.webkitExitFullscreen();
        //     }
        // }
        //
        // checkFull(){
        //     var isFull = false;
        //     if (document.fullscreenEnabled || document.msFullscreenEnabled ) {
        //         isFull = window.fullScreen || document.webkitIsFullScreen;
        //         if (isFull === undefined) {
        //             isFull = false;
        //         }
        //     }
        //     return isFull;
        // }

        //computed
        get cachePage(): string {
            return this.$store.state.app.cachePage;
        }

        mounted() {
            // this.init();

        }
    }
</script>

<style lang="scss" scoped>
    header {
        position: absolute;
        top: 0;
        border: 1px solid skyblue;
        width: 100%;
        height: 80px;

        .headImg {
            position: absolute;
            top: 20px;
            left: 200px;
            width: 60px;
            height: 40px;
        }

        .menuClick {
            position: absolute;
            top: 30px;
            left: 300px;
        }
    }

    .main {
        width: 100%;
        position: absolute;
        top: 80px;
        border: 1px solid skyblue;
    }
</style>
