<template>
  <div class="export">
    <button @click="down">
      <slot>导出Excel</slot>
    </button>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import $axios from 'axios';
@Component
export default class Export extends Vue {
  [x: string]: any;
  private points: object[] = [];
  private newArr: object[] = [];
  private down() {
    this.points = this.$store.getters.GetExcelData;
    this.points.length <= 100
      ? this.change1(this.points)
      : this.change2(this.points);
    this.ExportExcel();
    let ar = [
      { x: '121.325543', y: '31.763342' },
      { x: '121.355543', y: '31.463342' },
      { x: '121.324543', y: '31.763352' }
    ];
  }
  private change1(p: object[]) {
    let str = p.map((_: any) => _.x + ',' + _.y + ';').join('');
    this.changeBd(str.substring(0, str.lastIndexOf(';')));
  }
  // 长度超100
  private change2(p: object[]) {
    // tslint:disable
    this.group(p, 100).map(_ => {
      let s = _.map((c: any) => c.x + ',' + c.y + ';').join('');
      this.changeBd(s.substring(0, s.lastIndexOf(';')));
    });
  }
  private group(array: object[], subGroupLength: number) {
    let index = 0;
    let newArray = [];
    while (index < array.length) {
      newArray.push(array.slice(index, (index += subGroupLength)));
    }
    return newArray;
  }
  private changeBd(arg: string) {
    $axios
      .get(
        '/api/geoconv/v1/?coords=' +
          arg +
          '&from=1&to=5&ak=G54LAaflEVRcUG0CfwtdONWRDFuACnWa'
      )
      // tslint:disable
      .then(res => {
        // 拿到后台数据赋值给前端
        this.newArr.push(res.data.result);
        // 降维
        this.newArr = this.newArr.reduce((p: any, c: any) => p.concat(c), []);
      })
      // tslint:disable
      .catch(err => {
        console.log('错误信息：' + err);
      });
  }
  private ExportExcel() {
    // tslint:disable
    const { columns } = this;
    // const columns = this.columns;
    require.ensure([], () => {
      const { export_json_to_excel } = require('@/vendor/Export2Excel');
      //  ---require 括号里面是相对路径其实是引用  Export2Excel.js
      // const tHeader = ["类型", "姓名", "日期", "地址"];
      const tHeader = ['x', 'y'];
      //  ----tHeader 数组里面放的是字段的对应名
      const filterVal = ['x', 'y'];
      // filterVal  字段对应的值
      columns &&
        columns.map((data: any) => {
          tHeader.push(data.value);
          filterVal.push(data.key);
        });
      // 对应的json数组
      const data = this.formatJson(filterVal, this.newArr);
      export_json_to_excel(tHeader, data, '百度坐标');
    });
  }
  private formatJson(filterVal: any, jsonData: any) {
    return jsonData.map((v: any) => filterVal.map((j: any) => v[j]));
  }
}
</script>
