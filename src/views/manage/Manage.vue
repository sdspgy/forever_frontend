<template>
    <div>

        <header>
            <!--<img class="headImg"-->
            <!--src=""></img>-->
            <Icon class="menuClick" :style="{transform: 'rotateZ(' + (this.isSmillMenu ? '-90' : '0') + 'deg)'}"
                  @click="menuEvent()" size="30" type="md-menu"/>
        </header>

        <!--<el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">-->
        <!--<el-radio-button :label="false">展开</el-radio-button>-->
        <!--<el-radio-button :label="true">收起</el-radio-button>-->
        <!--</el-radio-group>-->
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                 :collapse="isSmillMenu">
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">导航一</span>
                </template>
                <el-menu-item-group>
                    <span slot="title">分组一</span>
                    <el-menu-item index="1-1">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                    <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                    <span slot="title">选项4</span>
                    <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3" disabled>
                <i class="el-icon-document"></i>
                <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <span slot="title">导航四</span>
            </el-menu-item>
        </el-menu>


        <!--<Menu v-show="!isSmillMenu" :theme="colorType" :open-names="['1']" accordion width="180px"-->
        <!--v-for="(item,index) in menuRouters" :key="index">-->
        <!--<Submenu name="1">-->
        <!--<template slot="title">-->
        <!--<Icon type="ios-paper"/>-->
        <!--{{item.title}}-->
        <!--</template>-->
        <!--<div v-for="(childernItem,childernIndex) in item.children">-->
        <!--<MenuItem name="1-1">-->
        <!--{{childernItem.title}}-->
        <!--</MenuItem>-->
        <!--</div>-->
        <!--</Submenu>-->
        <!--</Menu>-->

        <!--<Menu v-show="isSmillMenu" :theme="colorType" accordion width="80px">-->
        <!--<div style="height: 50px;line-height: 50px">-->
        <!--<Icon @click="menuRouterEvent()" type="ios-paper" size="20"/>-->
        <!--</div>-->
        <!--</Menu>-->

        <div class="main" :style="{left:(this.isSmillMenu ? '65' : '200') +'px' }">
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

        isSmillMenu: boolean = false;
        isCollapse: boolean = true;

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

        private menuRouterEvent(): void {
            debugger
        }

        handleOpen(key: number, keyPath: string[]) {
            console.log(key, keyPath);
        }

        handleClose(key: number, keyPath: string[]) {
            console.log(key, keyPath);
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

        get menuRouters(): string {
            return this.$store.state.app.menuRouters;
        }

        mounted() {
            // this.init();

        }
    }
</script>

<style lang="scss" scoped>
    header {
        width: 100%;
        height: 80px;
        box-shadow: 0px 3px 3px #f9f9f9;

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

        .menuClick:hover {
            cursor: pointer;
        }
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
        margin-top: 2px;
    }

    .main {
        width: 88%;
        position: absolute;
        top: 80px;
        box-shadow: -3px 0px 3px #f9f9f9;
        margin: 2px auto;
    }
</style>
