<template>
  <div>
    <div style="margin-bottom: 16px">
      <a-button type="primary" @click="start" :disabled="!hasSelected" :loading="loading">Reload</a-button>
      <download-excel
        class="export-excel-wrapper"
        :data="selectedData"
        :fields="json_fields"
        name="filename.xls"
      >
        <a-button type="primary">导出EXCEL</a-button>
      </download-excel>
      <span style="margin-left: 8px">
        <template v-if="hasSelected">{{`Selected ${selectedRowKeys.length} items`}}</template>
      </span>
    </div>
    <a-table
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      :columns="columns"
      :dataSource="data"
    />
  </div>
</template>
<script>
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
    }
  }
};
</script>