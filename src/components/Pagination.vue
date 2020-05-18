<template>
    <div>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page.currentPage"
                :page-sizes="[10, 20, 40, 80]"
                :page-size="page.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total=sendTotalSize>
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "Pagination",
        props: {
            sendTotalSize: Number,
            required: true
        },
        data() {
            return {
                page: {
                    currentPage: 1,
                    pageSize: 10
                }
            };
        },
        methods: {
            init() {
                this.$emit('page', this.page)
            },
            handleSizeChange(val) {
                this.page.pageSize = val;
                this.$emit('page', this.page)
            },
            handleCurrentChange(val) {
                this.page.currentPage = val
                this.$emit('page', this.page)
            }
        },
        mounted() {
            this.init();
        }
    }
</script>

<style scoped>

</style>
