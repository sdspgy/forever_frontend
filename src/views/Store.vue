<template>
    <div>
        <Button @click="change">change name</Button>
        <Button @click="draw">change draw</Button>
        <div>name: {{store.name}}</div>
        <div id="c1"></div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {State, Action} from "vuex-class";
    import {Chart} from '@antv/g2';

    @Component({
        components: {},
    })
    export default class Store extends Vue {
        @State((state) => state.store) private store: any;
        @Action("store/changeName") private changeName: any;

        data = [
            {genre: 'Sports', sold: 275},
            {genre: 'Strategy', sold: 115},
            {genre: 'Action', sold: 120},
            {genre: 'Shooter', sold: 350},
            {genre: 'Other', sold: 150},
        ];

        private change() {
            this.changeName()
        }

        private draw() {
            const chart = new Chart({
                container: 'c1',
                width: 600,
                height: 300,
            });

            // Step 2: 载入数据源
            chart.data(this.data);

            // Step 3：创建图形语法，绘制柱状图
            chart.interval().position('genre*sold');

            // Step 4: 渲染图
            chart.render();
        }
    }

</script>

<style scoped>

</style>
