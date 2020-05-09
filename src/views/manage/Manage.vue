<template>
    <div>

        <header>
            <!--<img class="headImg"-->
            <!--src=""></img>-->
            <Icon class="menuClick" :style="{transform: 'rotateZ(' + (this.isSmillMenu ? '-90' : '0') + 'deg)'}"
                  @click="menuEvent()" size="30" type="md-menu"/>
        </header>

        <el-menu :default-active="activeMenu" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                 :collapse="isSmillMenu">
            <el-submenu v-for="(item,index) in menuRouters" :key="index" :index="index.toString()">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">{{item.title}}</span>
                </template>
                <el-menu-item-group v-for="(childernItem,childernIndex) in item.children" :key="childernIndex">
                    <el-menu-item @click="menuRouterEvent(childernItem,childernIndex)"
                                  :index="(childernIndex+1000).toString()">{{childernItem.title}}
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>

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
        activeMenu: string = '-1'

        //methods
        private init(): void {

        }

        private menuEvent(): void {
            this.isSmillMenu = !this.isSmillMenu;
        }

        private menuRouterEvent(item: any, childernIndex: number): void {
            this.$router.push({
                name: item.name
            })
        }

        handleOpen(key: number, keyPath: string[]) {

        }

        handleClose(key: number, keyPath: string[]) {

        }

        //computed
        get cachePage(): string {
            return this.$store.state.app.cachePage;
        }

        get menuRouters(): string {
            return this.$store.state.app.menuRouters;
        }

        mounted() {
            this.init()
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
            left: 200px;
        }

        .menuClick:hover {
            cursor: pointer;
        }
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 700px;
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
