import Mock from "mockjs"; // 引入mockjs
import chatData from "./chatData";

Mock.setup({
  timeout: 3000
});

Mock.mock("/data/index", "post", chatData); // 根据数据模板生成模拟数据
