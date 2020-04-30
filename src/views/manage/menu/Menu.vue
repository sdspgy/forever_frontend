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
                <el-form-item label="名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="标题">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="标题">
                    <el-input v-model="form.notes"></el-input>
                </el-form-item>
                <el-form-item label="类型">
                    <el-select v-model="form.region" placeholder="类型">
                        <el-option label="接口" value="1"></el-option>
                        <el-option label="按钮" value="2"></el-option>
                        <el-option label="路由" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="即时配送">
                    <el-switch v-model="form.delivery"></el-switch>
                </el-form-item>
                <el-form-item label="活动性质">
                    <el-checkbox-group v-model="form.type">
                        <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                        <el-checkbox label="地推活动" name="type"></el-checkbox>
                        <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                        <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="特殊资源">
                    <el-radio-group v-model="form.resource">
                        <el-radio label="线上品牌商赞助"></el-radio>
                        <el-radio label="线下场地免费"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="活动形式">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Menu",
        data() {
            return {
                props: {
                    label: 'title',
                    children: 'children'
                },
                checkedInfo: [],
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                }
            }
        },
        computed: {
            routerMenu() {
                return this.$store.state.app.menuRouters;
            }
        },
        methods: {
            treeClick(data) {
                this.checkedInfo = data
            },
            onSubmit() {
                console.log('submit!');
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
