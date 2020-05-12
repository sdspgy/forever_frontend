<template>
    <div>
        <header>
            <img class="headImg"
                 src="../../assets/logo.png"></img>
            <Icon class="menuClick" :style="{transform: 'rotateZ(' + (this.isSmillMenu ? '-90' : '0') + 'deg)'}"
                  @click="menuEvent()" size="30" type="md-menu"/>
            <div class="userInfo">
                <el-image
                        style="width: 40px; height: 40px;border-radius: 5px 5px 5px 5px"
                        :src="userHeadUrl"
                        :preview-src-list="previewUserHeadUrl"
                        fit="cover">
                </el-image>
                <el-popover
                        placement="bottom"
                        title=""
                        width="100"
                        trigger="hover"
                        content="">
                    <el-link style="height: 30px;margin-left: 5px" @click="changePassword" icon="el-icon-edit">修改密码
                    </el-link>
                    <el-link style="height: 30px" @click="changeHeadUrl" icon="el-icon-view el-icon--right">更换头像
                    </el-link>
                    <el-button style="margin-left: 10px;color: slategray" type="text" slot="reference">{{username}}
                    </el-button>
                </el-popover>
            </div>
        </header>

        <el-dialog title="" :visible.sync="dialogFormVisibleChangePassword">
            <el-form label-width="100px">
                <el-form-item label="新密码">
                    <el-input type="password" v-model="pass"></el-input>
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input type="password" v-model="checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="旧密码">
                    <el-input type="password" v-model="oldPass" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" plain type="primary" @click="changePassEvent">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="" :visible.sync="dialogFormVisibleChangeHeadUrl">
            <el-form label-width="100px">
                <el-form-item label="头像">
                    <el-input style="width: 250px;float: left" v-model="headUrl"></el-input>
                    <el-image
                            style="width: 100px; height: 100px;border-radius: 10px 10px 10px 10px"
                            :src="headUrl"
                            fit="cover"></el-image>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" plain type="primary" @click="changeHeadUrlEvent">确 定</el-button>
            </div>
        </el-dialog>

        <div class="menuCache"
             :style="{left:(this.isSmillMenu ? '65' : '200') +'px',width:(this.isSmillMenu ? '95' : '88') +'%'}">
            <el-tag
                    class="menuTag"
                    style="margin: 4px"
                    @click="openMenuAdvert"
            >
                首 页
            </el-tag>
            <el-tag
                    class="menuTag"
                    style="margin: 4px"
                    v-for="(item,index) in cachePageName"
                    :key="item.title"
                    :type="item.menuId == activeMenu ? '' : 'info'"
                    @click="menuClick(item)"
                    @close="closeMenuClick(index,item.menuId)"
                    closable>
                {{item.title}}
            </el-tag>
            <el-tag
                    class="menuTag"
                    style="margin: 4px"
                    type="warning"
                    @click="cleanAllMenuClick()"
            >
                清空全部
            </el-tag>
        </div>

        <el-menu :default-active="activeMenu" :collapse-transition="menuTransition" background-color=""
                 text-color="" class="el-menu-vertical-demo"
                 @open="handleOpen" @close="handleClose"
                 :collapse="isSmillMenu">
            <el-submenu v-for="(item,index) in menuRouters" :key="index" :index="index.toString()">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">{{item.title}}</span>
                </template>
                <el-menu-item-group v-for="(childernItem,childernIndex) in item.children" :key="childernIndex">
                    <el-menu-item @click="menuRouterEvent(childernItem,childernItem.menuId)"
                                  :index="childernItem.menuId.toString()">{{childernItem.title}}
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>

        <div class="main"
             :style="{left:(this.isSmillMenu ? '65' : '200') +'px',width:(this.isSmillMenu ? '95' : '88') +'%'}">
            <keep-alive :include="cachePage">
                <router-view></router-view>
            </keep-alive>
        </div>

    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {getUserInfo, changePassword, changeUserHeadUrl} from '@/axios/api'

    @Component({
        components: {},
    })

    export default class Manage extends Vue {

        isSmillMenu: boolean = false;
        menuTransition: boolean = false;
        dialogFormVisibleChangePassword: boolean = false;
        dialogFormVisibleChangeHeadUrl: boolean = false;
        headUrl: string = '';
        activeMenu: string = '-1';
        username: string = '';
        userHeadUrl: string = 'http://img4.imgtn.bdimg.com/it/u=2183693248,2115415570&fm=11&gp=0.jpg';
        previewUserHeadUrl: string[] = [
            'http://img4.imgtn.bdimg.com/it/u=2183693248,2115415570&fm=11&gp=0.jpg'
        ];
        pass: string = '';
        checkPass: string = '';
        oldPass: string = '';

        //methods
        private init(): void {
            this.activeMenu = this.getStore("activeMenu");
            let params = {
                userId: this.getStore('userId')
            }
            getUserInfo(params).then(res => {
                if (res.code === 200) {
                    this.username = res.user.username;
                    if (res.user.headUrl) {
                        this.userHeadUrl = res.user.headUrl;
                        this.previewUserHeadUrl = [];
                        this.previewUserHeadUrl.push(res.user.headUrl)
                    }
                }
            })
        }

        private menuEvent(): void {
            this.isSmillMenu = !this.isSmillMenu;
        }

        private menuRouterEvent(item: any, index: number): void {
            let activeMenu = index.toString();
            this.setStore("activeMenu", activeMenu);
            this.activeMenu = activeMenu;
            if (this.cachePage.indexOf(item.name) == -1) {
                this.$store.commit("setCachePage", item.name)
                this.$store.commit("setCachePageName", item)
            }
            this.$router.push({
                name: item.name
            })
        }

        changePassword() {
            this.dialogFormVisibleChangePassword = true;
        }

        changeHeadUrl() {
            this.dialogFormVisibleChangeHeadUrl = true;
        }

        changePassEvent() {
            if (!this.pass) {
                this.$message({
                    message: '密码不能为空',
                    type: 'error'
                });
                return
            }
            if (!this.checkPass) {
                this.$message({
                    message: '密码不能为空',
                    type: 'error'
                });
                return
            }
            if (this.checkPass != this.pass) {
                this.$message({
                    message: '两次密码不能相同',
                    type: 'error'
                });
                this.pass = '';
                this.checkPass = '';
                return
            }
            if (!this.oldPass) {
                this.$message({
                    message: '旧密码不能为空',
                    type: 'error'
                });
                return
            }
            let params = {
                oldPassword: this.oldPass,
                newPassword: this.pass
            }
            changePassword(params).then(res => {
                if (res.code === 200) {
                    this.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                }
            })
            this.pass = '';
            this.checkPass = '';
            this.oldPass = '';
            this.dialogFormVisibleChangePassword = false;
        }


        changeHeadUrlEvent() {
            let params = {
                headUrl: this.headUrl
            }
            changeUserHeadUrl(params).then(res => {
                if (res.code === 200) {
                    this.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                }
            })
            this.headUrl = '';
            this.dialogFormVisibleChangeHeadUrl = false;
        }

        openMenuAdvert() {
            this.$router.push({
                name: 'advert'
            })
            this.activeMenu = '-1';
        }

        handleOpen(key: number, keyPath: string[]) {

        }

        handleClose(key: number, keyPath: string[]) {

        }

        menuClick(item) {
            this.setStore("activeMenu", item.menuId)
            this.activeMenu = item.menuId;
            this.$router.push({
                name: item.name
            })
        }

        closeMenuClick(index, menuId) {
            if (menuId == this.activeMenu) {
                this.$router.push({
                    name: 'advert'
                })
            }
            this.$store.commit("delCachePage", index)
            this.$store.commit("delCachePageName", index)
        }

        cleanAllMenuClick() {
            this.$router.push({
                name: 'advert'
            })
            this.activeMenu = '-1';
            this.$store.commit("delAllCachePage")
            this.$store.commit("delAllCachePageName")
        }

        //computed
        get cachePage(): string {
            return this.$store.state.app.cachePage;
        }

        get cachePageName(): string {
            return this.$store.state.app.cachePageName;
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
            top: 15px;
            left: 40px;
            width: 50px;
            height: 50px;
            border-radius: 5px 5px 5px 5px;
        }

        .menuClick {
            position: absolute;
            top: 30px;
            left: 200px;
        }

        .menuClick:hover {
            cursor: pointer;
        }

        .userInfo {
            width: 100px;
            height: 60px;
            position: relative;
            top: 20px;
            left: 92%;
            display: flex;

            .username {
                margin: 20px auto;
            }
        }
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        height: 100%;
        margin-top: 2px;
    }

    .menuCache {
        position: absolute;
        height: 40px;
        background-color: #F8F8FF;
        display: flex;
        /*overflow: scroll;*/

        .menuTag:hover {
            cursor: pointer;
        }
    }

    .main {
        position: absolute;
        top: 120px;
        box-shadow: -3px 0px 3px #f9f9f9;
        margin: 2px;
    }
</style>
