<template>
    <div class="task">
        <div class="addTask">
            <el-button style="margin-right: 5px" type="success" plain size="mini" @click="openAddTask('form')">新 增
            </el-button>
        </div>
        <el-table
                :data="tasks"
                style="width: 100%"
                max-height="700">
            <el-table-column
                    fixed
                    prop="name"
                    label="任务名"
                    width="100">
            </el-table-column>
            <el-table-column
                    fixed
                    prop="group"
                    label="组名"
                    width="100">
            </el-table-column>
            <el-table-column
                    fixed
                    prop="cronExpression"
                    label="正则时间"
                    width="100">
            </el-table-column>
            <el-table-column
                    fixed
                    prop="state"
                    label="状态"
                    width="100">
            </el-table-column>
            <el-table-column
                    fixed
                    prop="description"
                    label="描述">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="400">
                <template slot-scope="scope">
                    <el-button
                            @click.native.prevent="stopTaskRow(scope.$index, tasks[scope.$index])"
                            type="primary"
                            plain
                            size="small">
                        暂 停
                    </el-button>
                    <el-button
                            @click.native.prevent="resumeTaskRow(scope.$index, tasks[scope.$index])"
                            type="info"
                            :disabled="tasks[scope.$index].state == '正常' ? true : false"
                            plain
                            size="small">
                        恢 复
                    </el-button>
                    <el-button
                            @click.native.prevent="updateTaskRow(scope.$index, tasks[scope.$index])"
                            type="warning"
                            plain
                            size="small">
                        修 改
                    </el-button>
                    <el-button
                            @click.native.prevent="deleteTaskRow(scope.$index, tasks[scope.$index])"
                            type="danger"
                            plain
                            size="small">
                        移 除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--添加/修改-->
        <el-dialog title="任务" :visible.sync="dialogFormVisible">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="组名" prop="group">
                    <el-input v-model="form.group"></el-input>
                </el-form-item>
                <el-form-item label="时间" prop="cronExpression">
                    <el-input v-model="form.cronExpression"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="description">
                    <el-input v-model="form.description"></el-input>
                </el-form-item>
                <el-form-item label="任务" prop="jobTask">
                    <el-input v-model="form.jobTask"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="resetTaskForm('form')">重 置</el-button>
                <el-button size="mini" plain type="primary" @click="addOrUpdateTask('form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {quaryAllTask, startTask, pauseTask, resumeTask, deleteTask, modifyTask} from '@/axios/api'

    export default {
        name: "task",
        data() {
            return {
                tasks: [],
                form: {
                    name: '',
                    group: '',
                    cronExpression: '',
                    description: '',
                    jobTask: ''
                },
                rules: {
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'}
                    ],
                    group: [
                        {required: true, message: '请输入组名', trigger: 'blur'}
                    ],
                    cronExpression: [
                        {required: true, message: '请输入正则时间', trigger: 'blur'}
                    ],
                },
                dialogFormVisible: false,
                dialogFormVisibleGrantRole: false,
                addOrUpdate: false,
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                this.quaryAllTask()
            },
            quaryAllTask() {
                quaryAllTask(null).then(res => {
                    if (res.code === 200) {
                        this.tasks = res.taskShowList
                    }
                })
            },
            stopTaskRow(index, item) {
                let params = {
                    name: item.name,
                    group: item.group
                }
                pauseTask(params).then(res => {
                    if (res.code === 200) {
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                        this.quaryAllTask()
                    }
                })
            },
            resumeTaskRow(index, item) {
                let params = {
                    name: item.name,
                    group: item.group
                }
                resumeTask(params).then(res => {
                    if (res.code === 200) {
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                        this.quaryAllTask()
                    }
                })
            },
            updateTaskRow(index, item) {
                this.dialogFormVisible = true;
                this.addOrUpdate = false;
                this.form.name = item.name;
                this.form.group = item.group;
                this.form.cronExpression = item.cronExpression;
                this.form.description = item.description;
                this.form.jobTask = item.jobTask;
            },
            deleteTaskRow(index, item) {
                this.tasks.splice(index, 1)
                let params = {
                    name: item.name,
                    group: item.group
                }
                deleteTask(params).then(res => {
                    if (res.code === 200) {
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                        this.quaryAllTask()
                    }
                })
            },
            openAddTask(form) {
                this.dialogFormVisible = true;
                this.addOrUpdate = true;
                this.$refs[form].resetFields();
            },
            resetTaskForm(form) {
                this.$refs[form].resetFields();
            },
            addOrUpdateTask(form) {
                let params = this.form;
                if (this.addOrUpdate) {
                    startTask(params).then(res => {
                        if (res.code === 200) {
                            this.$message({
                                message: '操作成功',
                                type: 'success'
                            });
                            this.quaryAllTask()
                        }
                        this.dialogFormVisible = false;
                    })
                } else {
                    modifyTask(params).then(res => {
                        if (res.code === 200) {
                            this.$message({
                                message: '操作成功',
                                type: 'success'
                            });
                            this.quaryAllTask()
                        }
                        this.dialogFormVisible = false;
                    })
                }

            }
        }
    }
</script>

<style lang="scss">
    .task {
        margin: 30px 10px;

        .addTask {
            position: absolute;
            top: 1px;
        }
    }
</style>
