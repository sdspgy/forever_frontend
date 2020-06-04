<template>
    <div class="picture">
        <h1>上传图片到七牛云</h1>
        <el-upload
                :action="upLoadUrl"
                :headers="headers"
                ref="upload"
                :data="datas"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :before-upload="beforeUpload"
                :on-progress="uploadSuccess"
                :file-list="fileList"
                drag
                multiple
                list-type="picture"
                :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <div>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="upload">点击上传</el-button>
            </div>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>

        <h1>图片懒加载</h1>
        <div v-for="item in pictures">
            <div class="pictures">
                <img class="pictureItem" v-lazy="item.pictureAddress">
            </div>
            <a :href="item.pictureAddress" target="_blank">{{item.pictureAddress}}</a>
        </div>
    </div>
</template>

<script>
    import {getStore} from '@/store/storage'
    import {uploadQiniu, quaryAllPicture} from '@/axios/api'

    export default {
        name: "picture",
        data() {
            return {
                upLoadUrl: uploadQiniu(),
                headers: {},
                datas: {},
                pictures: [],
                fileList: []
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                this.quaryAllPicture()
            },
            quaryAllPicture() {
                quaryAllPicture(null).then(res => {
                    if (res.code === 200) {
                        this.pictures = res.pictureList;
                    }
                })
            },
            upload() {
                this.upLoadUrl = uploadQiniu();
                this.headers.token = getStore('token');
                this.datas = {};
                this.$refs.upload.submit();
                this.fileList = []
            },
            handleRemove(file, fileList) {

            },
            handlePreview(file) {

            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${file.name}？`);
            },
            beforeUpload(file, fileList) {

            },
            uploadSuccess() {
                this.quaryAllPicture()
            }
        }
    }
</script>

<style lang="scss">
    .picture {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .pictures {
            margin: 0 auto;
            width: 300px;
            height: 300px;
            border-radius: 5px 5px 5px 5px;
            overflow: hidden;

            .pictureItem {
                width: 300px;
                height: 300px;
                border-radius: 5px 5px 5px 5px;
                cursor: pointer;
                transition: all 0.6s;
            }

            .pictureItem:hover {
                transform: scale(1.4);
            }
        }

    }
</style>
