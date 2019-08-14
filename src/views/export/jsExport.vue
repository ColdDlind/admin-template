<template>
  <div>
    <div style="margin-bottom: 16px">
      <a-button type="primary" @click="exportExcel">导出EXCEL1</a-button>
      <a v-show="false" ref="exportExcel"></a>
    </div>
    <a-table
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      :columns="columns"
      :dataSource="data"
    />
  </div>
</template>
<script>
import { export_json_to_excel } from "@/vendor/Export2Excel.js";
const columns = [
  {
    title: "姓名",
    dataIndex: "name"
  },
  {
    title: "年龄",
    dataIndex: "age"
  },
  {
    title: "地址",
    dataIndex: "address"
  }
];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `测试${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`
  });
}

export default {
  data() {
    return {
      data,
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      selectedData: [],
      json_fields: {
        姓名: "name", //常规字段
        年龄: "age", //支持嵌套属性
        地址: "address" //常规字段
      }
    };
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0;
    }
  },
  methods: {
    start() {
      this.loading = true;
      // ajax request after empty completing
      setTimeout(() => {
        this.loading = false;
        this.selectedRowKeys = [];
      }, 1000);
    },
    onSelectChange(selectedRowKeys, data) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
      this.selectedData = data;
    },
    exportExcel() {
      const tHeader = ["姓名", "年龄", "地址"];
      const filterVal = ["name", "age", "address"];
      const list = this.selectedData;
      const data = this.formatJson(filterVal, list);
      export_json_to_excel(tHeader, data, "列表excel");
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    }
  }
};
</script>