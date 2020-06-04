<template>
    <div class="advert" :style="{height:(this.contentStyleObj.height)}">
        <el-button type="primary" plain @click="downloadExcel">测试下载excel</el-button>
        <div id="counterEcharts"></div>
    </div>
</template>

<script>
    import {getExele} from '@/axios/api'
    import {dateFormat} from '../../../common/common'

    export default {
        name: "echarts",
        data() {
            return {
                contentStyleObj: {
                    height: ''
                },
                realTime: {},
                counterChart: {},
                free: [],
                date: []
            }
        },
        mounted() {
            this.init();
            this.counter()
        },
        created() {
            window.addEventListener('resize', this.getHeight);
            this.getHeight()
        },
        destroyed() {
            //清除定时器
            clearInterval(this.realTime);
            window.removeEventListener('resize', this.getHeight)
        },
        methods: {
            getHeight() {
                this.contentStyleObj.height = window.innerHeight - 140 + 'px';
            },
            init() {
                this.realTime = setInterval(() => {
                    this.queryReal()
                }, 1000);
            },
            queryReal() {
                let free = this.free
                if (free) {
                    if (free.length >= 20) {
                        free.shift()
                    }
                }
                let date = this.date
                if (date) {
                    if (date.length >= 20) {
                        date.shift()
                    }
                }
                let value = Math.floor(Math.random() * (100 - 1001) + 1001);
                this.free.push(value);
                this.date.push(dateFormat("HH:MM:SS", new Date()));
                this.counterChart.setOption({
                    xAxis: {
                        data: this.date
                    },
                    series: [{
                        name: '',
                        data: this.free
                    }]
                });
            },
            counter() {
                this.counterChart = this.$echarts.init(document.getElementById('counterEcharts'));
                // 指定图表的配置项和数据
                var option = {
                    backgroundColor: '',
                    color: '#675bba',
                    title: {
                        // text: '',
                        // subtext: '',
                        left: 'center'
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: [],
                        axisLine: {
                            onZero: false,
                            lineStyle: {
                                color: '#AAAAAA'
                            }
                        },
                    },
                    yAxis: {
                        type: 'value',

                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            onZero: false,
                            lineStyle: {
                                color: '#AAAAAA'
                            }
                        },
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    series: [{
                        data: [],
                        type: 'line',
                        // areaStyle: {},
                        smooth: true,
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                    }]
                }
                this.counterChart.setOption(option);
            },
            downloadExcel() {
                getExele(null).then(res => {
                    const blob = new Blob([res.data]);
                    const fileName = '测试.xls';
                    const linkNode = document.createElement('a');

                    linkNode.download = fileName; //a标签的download属性规定下载文件的名称
                    linkNode.style.display = 'none';
                    linkNode.href = URL.createObjectURL(blob); //生成一个Blob URL
                    document.body.appendChild(linkNode);
                    linkNode.click();  //模拟在按钮上的一次鼠标单击

                    URL.revokeObjectURL(linkNode.href); // 释放URL 对象
                    document.body.removeChild(linkNode);
                });
            }
        }
    }
</script>

<style scoped>
    .advert {
        width: 100%;
        background-color: #f9f9f9;
    }

    #counterEcharts {
        width: 100%;
        height: 300px;
        margin-top: 10px;
        background-color: #fff;
    }
</style>
