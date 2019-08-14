<template>
  <div>
    <a-button @click="test">获取微信授权</a-button>
    <a-button @click="test1">获取关注列表</a-button>
    <div v-if="aloneUser">
      <a-card hoverable style="width: 160px">
        <img alt="example" :src="aloneUser.headimgurl" slot="cover">
        <a-card-meta :title="aloneUser.nickname">
          <template slot="description">是否关注：{{aloneUser.subscribe?"是":"否"}}</template>
          <template slot="description">国家：{{aloneUser.country}}</template>
        </a-card-meta>
      </a-card>
    </div>
    <div v-if="allInfo" style="display:flex">
      <a-card
        hoverable
        style="width: 160px;margin-right:20px"
        v-for="item in allInfo"
        :key="item.openid"
      >
        <img alt="example" :src="item.headimgurl" slot="cover">
        <a-card-meta :title="item.nickname">
          <template slot="description">
            是否关注：{{item.subscribe?"是":"否"}}
            <br>
          </template>
          <template slot="description">国家：{{item.country}}</template>
        </a-card-meta>
      </a-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { win32 } from "path";
export default {
  data() {
    return {
      aloneUser: null,
      allInfo: null
    };
  },
  created() {},
  methods: {
    test() {
      let code = this.$route.query.code || "";
      if (code) {
        this.getData(code);
      } else {
        const appId = "wxa60a96bc3a357148";
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodeURIComponent(
          window.location.href
        )}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
      }
    },
    test1() {
      axios.get(`http://192.168.1.138:8080/users/userList`).then(res => {
        this.allInfo = res.data.user_info_list;
      });
    },
    getData(code) {
      // axios.get(`http://192.168.1.138:8080/users?code=${code}`).then(res => {
      //   this.aloneUser = res.data;
      // });
      axios
        .post(
          `http://192.168.1.144:9016/shop/h5/open/light/userInfo`,
          { code: code },
          {
            transformRequest: [
              data => {
                // 对 data 进行任意转换处理
                let ret = "";
                for (let it in data) {
                  ret +=
                    encodeURIComponent(it) +
                    "=" +
                    encodeURIComponent(data[it]) +
                    "&";
                }
                ret = ret.substr(0, ret.length - 1);
                return ret;
              }
            ]
          }
        )
        .then(res => {
          console.log(res);
        });
    }
  }
};
</script>

<style>
</style>
