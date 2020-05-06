<template>
    <div class="menu">
        <el-tree class="tree"
                 :data="routerMenu"
                 :props="props"
                 node-key="menuId"
                 @node-click="treeClick">
        </el-tree>
        <div class="updateInfo">
            <el-form ref="form" :model="form" label-width="80px">
                <input type="hidden" name="menuId" v-model="form.menuId"/>
                <el-form-item label="名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="标题">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="注释">
                    <el-input v-model="form.notes"></el-input>
                </el-form-item>
                <el-form-item label="类型">
                    <el-select v-model="form.type" placeholder="类型">
                        <el-option label="接口" value="1"></el-option>
                        <el-option label="按钮" value="2"></el-option>
                        <el-option label="路由" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="排序">
                    <el-slider
                            v-model="form.slider"
                            show-input>
                    </el-slider>
                </el-form-item>
                <el-form-item v-show="form.type == 3? false : true" label="权限">
                    <el-input v-model="form.power"></el-input>
                </el-form-item>
                <el-form-item v-show="form.type == 3? false : true" label="图标">
                    <el-input v-model="form.icon"></el-input>
                </el-form-item>
                <el-form-item v-show="form.type == 3 ? true :false" label="路径">
                    <el-input v-model="form.path"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">修改</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {queryMenuTree} from '@/axios/api'

    export default {
        name: "Menu",
        data() {
            return {
                props: {
                    label: 'title',
                    children: 'children'
                },
                routerMenu: [],
                checkedInfo: [],
                form: {
                    menuId: 0,
                    name: '',
                    title: '',
                    notes: '',
                    type: '',
                    slider: 0,
                    power: '',
                    icon: '',
                    path: ''
                }
            }
        },
        mounted() {
            this.init();
        },
        computed: {},
        methods: {
            init() {
                queryMenuTree(null).then(res => {
                    if (res.code === 200) {
                        this.routerMenu = res.sysMenus[0].children
                    }
                })
            },
            treeClick(data) {
                this.checkedInfo = data
                this.form = {
                    menuId: data.menuId,
                    name: data.name,
                    title: data.title,
                    notes: data.notes,
                    slider: data.orderNum,
                    power: data.perms,
                    icon: data.icon,
                    type: data.type.toString(),
                    path: data.path
                }
            },
            onSubmit() {

            }
        }
    }
</script>

<style lang="scss">
    .menu {
        margin: 10px 10px;

        .tree {
            width: 30%;
        }

        .updateInfo {
            position: absolute;
            top: 10px;
            left: 40%;
            width: 50%;
        }
    }


</style>
