<template>
    <div class="role">
        <div class="addRole">
            <el-button style="margin-right: 5px" type="success" plain size="mini" @click="openAddRole('form')">新 增
            </el-button>
        </div>

        <el-dialog title="" :visible.sync="dialogFormVisible">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="名称" prop="roleName">
                    <el-input v-model="form.roleName"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="form.remark"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="resetRoleForm('form')">重 置</el-button>
                <el-button size="mini" plain type="primary" @click="addOrUpdateRole('form')">确 定</el-button>
            </div>
        </el-dialog>

        <div class="roleTable">
            <el-table
                    :data="sysRoles"
                    style="width: 100%"
                    max-height="700">
                <el-table-column
                        fixed
                        prop="roleName"
                        label="角色名"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="remark"
                        label="备注">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="250">
                    <template slot-scope="scope">
                        <el-button
                                @click.native.prevent="grantRow(scope.$index, sysRoles[scope.$index])"
                                type="primary"
                                plain
                                size="small">
                            授 权
                        </el-button>
                        <el-button
                                @click.native.prevent="updateRow(scope.$index, sysRoles[scope.$index])"
                                type="warning"
                                plain
                                size="small">
                            修 改
                        </el-button>
                        <el-button
                                @click.native.prevent="deleteRow(scope.$index, sysRoles)"
                                type="danger"
                                plain
                                size="small">
                            移 除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import {queryAllRoles, insertRole, updateRole, deleteRole, queryAllMenuIshave, updateRoleMenus} from '@/axios/api'

    export default {
        name: "Role",
        data() {
            return {
                sysRoles: [],
                routerMenu: [],
                form: {
                    roleName: '',
                    remark: '',
                    roleId: ''
                },
                rules: {
                    roleName: [
                        {required: true, message: '请输入名称', trigger: 'blur'},
                        {min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur'}
                    ],
                },
                dialogFormVisible: false,
                addOrUpdate: true
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                queryAllRoles().then(res => {
                    if (res.code === 200) {
                        this.sysRoles = res.sysRoles;
                    }
                })
            },
            openAddRole(form) {
                this.dialogFormVisible = true;
                this.addOrUpdate = true;
                this.resetRoleForm(form);
            },
            resetRoleForm(form) {
                this.$refs[form].resetFields();
            },
            addOrUpdateRole(form) {
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        let params = {
                            roleName: this.form.roleName,
                            remark: this.form.remark
                        }
                        if (this.addOrUpdate) {
                            insertRole(params).then(res => {
                                if (res.code === 200) {
                                    this.$message({
                                        message: '操作成功',
                                        type: 'success'
                                    });
                                    this.init()
                                }
                            })
                        } else {
                            params.roleId = this.form.roleId;
                            updateRole(params).then(res => {
                                if (res.code === 200) {
                                    this.$message({
                                        message: '操作成功',
                                        type: 'success'
                                    });
                                    this.init()
                                }
                            })
                        }
                        this.dialogFormVisible = false;
                    }
                })
            },
            grantRow(index, rows) {

            },
            deleteRow(index, rows) {
                const roleId = rows[index].roleId;
                rows.splice(index, 1);
                deleteRole(roleId, null).then(res => {
                    if (res === 200) {
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                    }
                })
            },
            updateRow(index, rows) {
                this.dialogFormVisible = true;
                this.addOrUpdate = false;
                this.form.roleName = rows.roleName;
                this.form.remark = rows.remark;
                this.form.roleId = rows.roleId;
            }
        },
        computed: {}
    }
</script>

<style lang="scss" scoped>
    .role {
        margin: 10px 10px;

        .addRole {
            position: absolute;
            left: 10px;
        }

        .roleTable {
            position: relative;
            top: 30px;
        }
    }
</style>
