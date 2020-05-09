<template>
    <div class="menu">
        <div class="addMenu">
            <el-button style="margin-right: 5px" type="success" plain size="mini" @click="openAddMenu('form')">新 增
            </el-button>
            <el-popconfirm
                    confirmButtonText='好的'
                    cancelButtonText='不用了'
                    icon="el-icon-info"
                    iconColor="red"
                    title="确定删除吗？"
                    @onConfirm="deleteMenuEvent"
            >
                <el-button slot="reference" type="danger" plain size="mini">删 除</el-button>
            </el-popconfirm>
            <el-dialog title="" :visible.sync="dialogFormVisible">
                <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                    <input type="hidden" name="parentId" v-model="form.parentId"/>
                    <el-form-item label="名称" prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="标题" prop="title">
                        <el-input v-model="form.title"></el-input>
                    </el-form-item>
                    <el-form-item label="注释" prop="notes">
                        <el-input v-model="form.notes"></el-input>
                    </el-form-item>
                    <el-form-item label="类型" prop="type">
                        <el-select v-model="form.type" placeholder="类型">
                            <el-option label="接口" value="1"></el-option>
                            <el-option label="按钮" value="2"></el-option>
                            <el-option label="路由" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="排序" prop="slider">
                        <el-slider
                                v-model="form.slider"
                                show-input>
                        </el-slider>
                    </el-form-item>
                    <el-form-item v-show="form.type == 3? false : true" label="权限" prop="power">
                        <el-input v-model="form.power"></el-input>
                    </el-form-item>
                    <el-form-item v-show="form.type == 3? false : true" label="图标" prop="icon">
                        <el-input v-model="form.icon"></el-input>
                    </el-form-item>
                    <el-form-item v-show="form.type == 3 ? true :false" label="路径" prop="path">
                        <el-input v-model="form.path"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button size="mini" @click="resetForm('form')">重 置</el-button>
                    <el-button size="mini" plain type="primary" @click="addMenu('form')">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <el-tree class="tree"
                 :data="routerMenu"
                 :props="props"
                 node-key="menuId"
                 @node-click="treeClick">
        </el-tree>
        <div class="updateInfo">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <input type="hidden" name="menuId" v-model="form.menuId"/>
                <el-form-item label="名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="标题" prop="title">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="注释" prop="notes">
                    <el-input v-model="form.notes"></el-input>
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-select v-model="form.type" placeholder="类型">
                        <el-option label="接口" value="1"></el-option>
                        <el-option label="按钮" value="2"></el-option>
                        <el-option label="路由" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="排序" prop="slider">
                    <el-slider
                            v-model="form.slider"
                            show-input>
                    </el-slider>
                </el-form-item>
                <el-form-item v-show="form.type == 3? false : true" label="权限" prop="power">
                    <el-input v-model="form.power"></el-input>
                </el-form-item>
                <el-form-item v-show="form.type == 3? false : true" label="图标" prop="icon">
                    <el-input v-model="form.icon"></el-input>
                </el-form-item>
                <el-form-item v-show="form.type == 3 ? true :false" label="路径" prop="path">
                    <el-input v-model="form.path"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button size="mini" @click="resetForm('form')">重 置</el-button>
                    <el-button size="mini" plain type="primary" @click="updateMenu('form')">修 改</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {queryMenuTree, insertMenu, updateMenu, deleteMenu} from '@/axios/api'

    export default {
        name: "Menu",
        data() {
            return {
                props: {
                    label: 'title',
                    children: 'children'
                },
                routerMenu: [],
                form: {
                    parentId: 1,
                    menuId: 0,
                    name: '',
                    title: '',
                    notes: '',
                    type: '',
                    slider: 0,
                    power: '',
                    icon: '',
                    path: ''
                },
                rules: {},
                dialogFormVisible: false
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
                this.form = {
                    menuId: data.menuId,
                    name: data.name,
                    title: data.title,
                    notes: data.notes,
                    slider: data.orderNum,
                    power: data.perms,
                    icon: data.icon,
                    type: data.type.toString(),
                    path: data.path,
                    parentId: data.menuId
                }
            },
            openAddMenu(form) {
                this.dialogFormVisible = true;
                this.resetForm(form);
            },
            resetForm(form) {
                this.$refs[form].resetFields();
            },
            addMenu(form) {
                let params = {
                    name: this.form.name,
                    title: this.form.title,
                    notes: this.form.notes,
                    orderNum: this.form.slider,
                    perms: this.form.power,
                    icon: this.form.icon,
                    type: this.form.type.toString(),
                    path: this.form.path,
                    parentId: this.form.parentId
                }
                insertMenu(params).then(res => {
                    if (res.code === 200) {
                        this.$refs[form].resetFields();
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                        this.init()
                    }
                })
                this.dialogFormVisible = false;
            },
            deleteMenuEvent() {
                if (this.form.menuId === 0) {
                    this.$message.error('请选中菜单');
                    return
                }
                let params = {
                    menuId: this.form.menuId
                }
                deleteMenu(params).then(res => {
                    if (res.code === 200) {
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                        this.init()
                    }
                })
            },
            updateMenu(form) {
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        let params = {
                            menuId: this.form.menuId,
                            name: this.form.name,
                            title: this.form.title,
                            notes: this.form.notes,
                            orderNum: this.form.slider,
                            perms: this.form.power,
                            icon: this.form.icon,
                            type: this.form.type.toString(),
                            path: this.form.path,
                        }
                        updateMenu(params).then(res => {
                            if (res.code === 200) {
                                this.$message({
                                    message: '操作成功',
                                    type: 'success'
                                });
                            }
                        })
                    }
                });
            },
        }
    }
</script>

<style lang="scss">
    .menu {
        margin: 10px 10px;

        .addMenu {
            position: absolute;
        }

        .tree {
            position: relative;
            top: 50px;
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
