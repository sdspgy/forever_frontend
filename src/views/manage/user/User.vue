<template>
    <div class="user">

        <div class="addUser">
            <el-button style="margin-right: 5px" type="success" plain size="mini" @click="openAddUser('form')">新 增
            </el-button>
        </div>

        <!--添加/修改-->
        <el-dialog title="" :visible.sync="dialogFormVisible">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="名称" prop="username">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <div slot="footer" class="dialog-footer">
                    <el-button size="mini" @click="resetUserForm('form')">重 置</el-button>
                    <el-button size="mini" plain type="primary" @click="addOrUpdateUser('form')">确 定</el-button>
                </div>
            </el-form>
        </el-dialog>

        <div class="userTable">
            <el-table
                    :data="sysUsers"
                    style="width: 100%"
                    max-height="700">
                <el-table-column
                        fixed
                        prop="username"
                        label="用户名"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="headUrl"
                        label="头像"
                        width="100">
                    <template slot-scope="scope">
                        <el-image
                                style="width: 50px; height: 50px;border-radius: 5px 5px 5px 5px"
                                :src="scope.row.headUrl"
                                fit="cover">
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="roleList"
                        label="角色"
                        width="150">
                    <template slot-scope="scope">
                        <el-tag v-for="(item,index) in scope.row.roleList" :key="index"
                                type="success"
                                disable-transitions>{{item.roleName}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="status"
                        label="状态"
                        width="150">
                    <template slot-scope="scope">
                        <el-tag
                                :type="scope.row.status === '0' ? 'warning' : 'success'"
                                disable-transitions>{{scope.row.status === '0' ? '停用' : '正常'}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        label="创建时间"
                        sortable
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="email"
                        label="邮箱"
                        width="150">
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
                            分配角色
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
    import {allUser} from '@/axios/api'

    export default {
        name: "User",
        data() {
            return {
                sysUsers: [],
                form: {
                    username: ''
                },
                rules: {
                    username: [
                        {required: true, message: '请输入名称', trigger: 'blur'},
                        {min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur'}
                    ],
                },
                dialogFormVisible: false,
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                allUser(null).then(res => {
                    if (res.code === 200) {
                        this.sysUsers = res.sysUsers
                    }
                })
            },
            openAddUser(form) {
                this.dialogFormVisible = true
            }

        },
        computed: {}
    }
</script>

<style lang="scss" scoped>
    .user {
        margin: 10px 10px;

        .addUser {
            position: absolute;
            left: 10px;
        }

        .userTable {
            position: relative;
            top: 30px;
        }
    }
</style>
