<template>
  <div>
    <Head />
    <!-- 为ECharts准备一个具备宽高的Dom -->
    <div class="chart">
      <div
        class="childrenChart"
        ref="main"
        style="width: 45%; height: 300px"
      ></div>
      <div
        class="childrenChart"
        ref="main2"
        style="width: 45%; height: 300px"
      ></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
const echarts = require("echarts");
import "echarts/theme/macarons.js";
import Head from "../components/module";
import { getStatistics } from "../api/statistics";
export default {
  name: "Home",
  components: { Head },
  data () {
    return {};
  },
  created () {
  },
  mounted () {
    this.fetchData()

  },
  methods: {
    fetchData () {
      debugger
      this.setChart()
    },
    // 设置图标参数
    setChart () {
      let myChart = echarts.init(this.$refs.main);
      let myChart2 = echarts.init(this.$refs.main2);
      getStatistics().then(result => {
        let option2 = {
          title: {
            text: "数据统计",
            left: "center",
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)",
          },
          legend: {
            // orient: 'vertical',
            // top: 'middle',
            bottom: 10,
            left: "center",
            data: ["用户数", "机构数", "宠物数", "申请数量"],
          },
          series: [
            {
              type: "pie",
              radius: "65%",
              center: ["50%", "50%"],
              selectedMode: "single",
              data: [],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
            },
          ],
        };
        option2.series[0].data.push({
          "value": result.data.data[0].user, "name": "用户数"
        }, {
          "value": result.data.data[0].organ, "name": "机构数"
        }, {
          "value": result.data.data[0].animal, "name": "宠物数"
        }, {
          "value": result.data.data[0].apply, "name": "申请数"
        })
        myChart2.setOption(option2);
        console.log(result.data, '数据')
      })


      getStatistics().then(result => {
        debugger
        let option = {
          // x轴是类目轴（离散数据）,必须通过data设置类目数据
          xAxis: {
            type: "category",
            data: ["12-01", "12-02", "12-03", "12-04", "12-05"],
            axisLine: {
              lineStyle: {
                color: "#409EFF", // x轴及其文字颜色
              },
            },
          },
          // y轴是数据轴（连续数据）
          yAxis: {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#409EFF", // y轴及其文字颜色
              },
            },
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
            },
            padding: [10, 15],
          },
          legend: {
            data: ["用户数", "机构数", "宠物数", "申请数"],
          },
          // 系列列表。每个系列通过 type 决定自己的图表类型
          series: [
            {
              name: "用户数",
              // 系列中的数据内容数组
              data: [],
              // 折线图
              type: "line",
              color: ["#839DD8"],
              itemStyle: { normal: { label: { show: true } } },
            },
            {
              name: "机构数",
              // 系列中的数据内容数组
              data: [],
              // 折线图
              type: "line",
              color: ["#42B983"],
              itemStyle: { normal: { label: { show: true } } },
            },
            {
              name: "宠物数",
              // 系列中的数据内容数组
              data: [],
              // 折线图
              type: "line",
              color: ["#FFCD42"],
              itemStyle: { normal: { label: { show: true } } },
            },
            {
              name: "申请数",
              // 系列中的数据内容数组
              data: [],
              // 折线图
              type: "line",
              color: ["#F74B83"],
              itemStyle: { normal: { label: { show: true } } },
            },
          ],
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        // this.$set(option.series[0].data, [], result.data.data[0].user)
        option.series[0].data.push(result.data.data[0].user)
        option.series[1].data.push(result.data.data[0].organ)
        option.series[2].data.push(result.data.data[0].animal)
        option.series[3].data.push(result.data.data[0].apply)
      })
      // let option2 = {
      //   title: {
      //     text: "数据统计",
      //     left: "center",
      //   },
      //   tooltip: {
      //     trigger: "item",
      //     formatter: "{a} <br/>{b} : {c} ({d}%)",
      //   },
      //   legend: {
      //     // orient: 'vertical',
      //     // top: 'middle',
      //     bottom: 10,
      //     left: "center",
      //     data: ["用户数", "机构数", "宠物数", "申请数量"],
      //   },
      //   series: [
      //     {
      //       type: "pie",
      //       radius: "65%",
      //       center: ["50%", "50%"],
      //       selectedMode: "single",
      //       data: [

      //         { value: "", name: "用户数" },
      //         { value: "", name: "机构数" },
      //         { value: "", name: "宠物数" },
      //         { value: "", name: "申请数量" },
      //       ],
      //       emphasis: {
      //         itemStyle: {
      //           shadowBlur: 10,
      //           shadowOffsetX: 0,
      //           shadowColor: "rgba(0, 0, 0, 0.5)",
      //         },
      //       },
      //     },
      //   ],
      // };

      // myChart2.setOption(option2);
    },
  },
};
</script>

<style lang="scss" scoped>
.chart {
  padding: 10px;
  margin: 40px;
  display: flex;
  justify-content: center;
}

.childrenChart {
  margin: 20px;
  display: flex;
  justify-content: center;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.22);
  padding: 8px;
}
</style>
