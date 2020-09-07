<template>
  <div class="upload">
    <input
      class="input-file"
      type="file"
      @change="exportData"
      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
    />
    <button @click="importExcel">
      <slot>上传Excel</slot>
    </button>
  </div>
</template>

<script lang="ts">
import XLSX from 'xlsx';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Upload extends Vue {
  private upData: any[] = [];
  private fileName: string = ''; // 上传的文件名
  private importExcel() {
    // document.querySelector('.input-file').click();
    let button: any = document.querySelector('.input-file');
    button.click();
    console.log('导入表格！');
  }
  private exportData(event: { currentTarget: { files: string | any[] } }) {
    if (!event.currentTarget.files.length) {
      return;
    }
    const that = this;
    that.upData = [];
    // 拿取文件对象
    let f = event.currentTarget.files[0];
    this.fileName = f.name;
    console.log('上传的文件名', this.fileName);
    // 这里已经拿到了excel的file文件，若是项目需求，可直接$emit丢出文件
    that.$emit('getMyExcelData', f);
    // 用FileReader来读取
    let reader = new FileReader();
    // 重写FileReader上的readAsBinaryString方法
    // tslint:disable 
    FileReader.prototype.readAsBinaryString = function(f) {
      let binary = '';
      let wb; // 读取完成的数据
      let outdata; // 你需要的数据
      reader.onload = function() {
        // 读取成Uint8Array，再转换为Unicode编码（Unicode占两个字节）
        // tslint:disable 
        let bytes = new Uint8Array(reader.result as ArrayBuffer);
        let length = bytes.byteLength;
        for (let i = 0; i < length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        // 接下来就是xlsx
        wb = XLSX.read(binary, {
          type: 'binary',
          cellDates: true // 有日期
        });
        outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
        // 处理数据
        console.log('outdata', outdata, outdata.length);
        
        that.upData = outdata;
        that.$store.dispatch('UpdateDataCommit', that.upData).then(() => {
          // console.log(that.$store.getters.GetExcelData);
          if (that.$store.getters.GetExcelData.length !== 0) {
          alert('上传成功！');
        }
        });
      };
      reader.readAsArrayBuffer(f);
    };
    reader.readAsBinaryString(f);
  }
}
</script>

<style scoped lang="scss">
.upload .input-file {
  display: none;
}
</style>
