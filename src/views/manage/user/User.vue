<template>
    <div class="user" :style={height:(this.contentStyleObj.height)}>

        <div v-permission="'sys:user:addUser'" class="addUser">
            <el-button style="margin-right: 5px" type="success" plain size="mini" @click="openAddUser('form')">新 增
            </el-button>
        </div>

        <!--添加/修改-->
        <el-dialog title="" :visible.sync="dialogFormVisible">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="名称" prop="username">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="头像" prop="headUrl">
                    <el-input style="width: 250px;float: left" v-model="form.headUrl"></el-input>
                    <el-image
                            style="width: 100px; height: 100px;border-radius: 10px 10px 10px 10px"
                            :src="form.headUrl"
                            fit="cover"></el-image>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-switch
                            v-model="form.status"
                            active-text="正常"
                            inactive-text="暂用">
                    </el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="resetUserForm('form')">重 置</el-button>
                <el-button size="mini" plain type="primary" @click="addOrUpdateUser('form')">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="分配角色" :visible.sync="dialogFormVisibleGrantRole">
            <el-checkbox-group v-model="checkedRoles" @change="handleCheckedRoleChange">
                <el-checkbox v-for="role in roles" :label="role.roleId" :key="role.roleId">{{role.roleName}}
                </el-checkbox>
            </el-checkbox-group>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" plain type="primary" @click="grantRole">确 定</el-button>
            </div>
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
                        width="200">
                    <template slot-scope="scope">
                        <el-tag style="margin: 2px 2px" v-for="(item,index) in scope.row.roleList" :key="index"
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
                        label="邮箱">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="250">
                    <template slot-scope="scope">
                        <el-button
                                v-permission="'sys:user:grantRole'"
                                @click.native.prevent="grantRoleRow(scope.$index, sysUsers[scope.$index])"
                                type="primary"
                                plain
                                size="small">
                            分配角色
                        </el-button>
                        <el-button
                                v-permission="'sys:user:updateUser'"
                                @click.native.prevent="updateUserRow(scope.$index, sysUsers[scope.$index])"
                                type="warning"
                                plain
                                size="small">
                            修 改
                        </el-button>
                        <el-button
                                v-permission="'sys:user:deleteUser'"
                                @click.native.prevent="deleteUserRow(scope.$index, sysUsers)"
                                type="danger"
                                plain
                                size="small">
                            移 除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <Pagination class="pafination" v-on:page="getInfo" :sendTotalSize="totalSize"></Pagination>
    </div>

</template>

<script>
    import {allUser, insertUser, updateUser, deletetUser, queryAllRoles, updateUserRoles} from '@/axios/api'

    export default {
        name: "user",
        components: {},
        data() {
            return {
                sysUsers: [],
                form: {
                    username: '',
                    email: '',
                    headUrl: '',
                    status: true,
                    userId: -1
                },
                rules: {
                    username: [
                        {required: true, message: '请输入名称', trigger: 'blur'},
                        {min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur'}
                    ],
                },
                dialogFormVisible: false,
                dialogFormVisibleGrantRole: false,
                addOrUpdate: false,
                checkedRoles: [],
                roles: [],
                page: {},
                totalSize: 0,
                contentStyleObj: {
                    height: ''
                }
            }
        },
        mounted() {

        },
        created() {
            window.addEventListener('resize', this.getHeight);
            this.getHeight()
        },

        destroyed() {
            window.removeEventListener('resize', this.getHeight)
        },
        methods: {
            getHeight() {
                this.contentStyleObj.height = window.innerHeight - 125 + 'px';
            },
            init() {
                let params = {
                    pageSize: this.page.currentPage,
                    pageNumber: this.page.pageSize
                }
                allUser(params).then(res => {
                    if (res.code === 200) {
                        this.sysUsers = res.sysUsers;
                        this.totalSize = res.sumUser
                    }
                })
            },
            getInfo(info) {
                this.page = info;
                this.init()
            },
            addOrUpdateUser(from) {
                let params = {
                    username: this.form.username,
                    status: this.form.status ? 1 : 0,
                    headUrl: this.form.headUrl,
                    email: this.form.email
                }
                if (this.addOrUpdate) {
                    insertUser(params).then(res => {
                        if (res.code === 200) {
                            this.$message({
                                message: '操作成功',
                                type: 'success'
                            });
                            this.init()
                        }
                    })
                } else {
                    params.userId = this.form.userId;
                    updateUser(params).then(res => {
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
            },
            openAddUser(form) {
                this.dialogFormVisible = true;
                this.addOrUpdate = true;
                this.resetUserForm(form)
            },
            resetUserForm(form) {
                this.$refs[form].resetFields();
            },
            grantRoleRow(index, rows) {
                this.dialogFormVisibleGrantRole = true;
                this.form.userId = rows.userId;
                this.checkedRoles = [];
                queryAllRoles().then(res => {
                    if (res.code === 200) {
                        this.roles = res.sysRoles;
                    }
                })
                if (rows.roleList) {
                    rows.roleList.forEach(item => {
                        this.checkedRoles.push(item.roleId)
                    })
                }
            },
            grantRole() {
                let params = {
                    roles: this.checkedRoles,
                    userId: this.form.userId
                }
                updateUserRoles(params).then(res => {
                    if (res.code === 200) {
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                    }
                    this.init()
                })
                this.dialogFormVisibleGrantRole = false;
            },
            updateUserRow(index, rows) {
                this.dialogFormVisible = true;
                this.addOrUpdate = false;
                this.form = {
                    username: rows.username,
                    status: rows.status == 1 ? true : false,
                    headUrl: rows.headUrl,
                    email: rows.email,
                    userId: rows.userId
                }
            },
            deleteUserRow(index, rows) {
                const userId = rows[index].userId;
                this.sysUsers.splice(index, 1)
                deletetUser(userId, null).then(res => {
                    if (res.code === 200) {
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                    }
                })
            },
            handleCheckedRoleChange(info) {
                this.checkedRoles = info
            }

        },
        computed: {}
    }
</script>

<style lang="scss" scoped>
    .user {
        margin: 10px 10px;
        background-color: #f9f9f9;

        .addUser {
            position: absolute;
            left: 10px;
        }

        .userTable {
            position: relative;
            top: 30px;
        }

        .pafination {
            margin-top: 40px
        }
    }
</style>
