<template>
  <div class="trade-container">
    <h3 class="title">填写并核对订单信息</h3>
    <div class="content">
      <h5 class="receive">收件人信息</h5>
      <div class="address clearFix" v-for="item in address" :key="item.id">
        <span class="username" :class="{ selected: item.isDefault == 1 }">{{
          item.consignee
        }}</span>
        <p @click="checkedAddress(item, address)">
          <span class="s1">{{ item.fullAddress }}</span>
          <span class="s2">{{ item.phoneNum }}</span>
          <span class="s3" v-show="item.isDefault == 1">默认地址</span>
        </p>
      </div>
      <div class="line"></div>
      <h5 class="pay">支付方式</h5>
      <div class="address clearFix">
        <span
          class="username"
          :class="{ selected: this.isApply == 'appleOne' }"
          @click="isOnline('appleOne')"
          >在线支付</span
        >
        <span
          class="username"
          :class="{ selected: this.isApply == 'appleTwo' }"
          @click="isOnline('appleTwo')"
          style="margin-left: 5px"
          >货到付款</span
        >
        <span
          class="username"
          :class="{ selected: this.isApply == 'appleThree' }"
          @click="isOnline('appleThree')"
          style="margin-left: 5px"
          >花呗分期</span
        >
      </div>
      <div class="line"></div>
      <h5 class="pay">送货清单</h5>
      <div class="way">
        <h5>配送方式</h5>
        <div class="info clearFix">
          <span class="s1">天天快递</span>
          <p>配送时间：预计8月10日（周三）09:00-15:00送达</p>
        </div>
      </div>
      <div class="detail">
        <h5>商品清单</h5>
        <ul
          class="list clearFix"
          v-for="result in order.detailArrayList"
          :key="result.skuId"
        >
          <li>
            <img :src="result.imgUrl" alt="" style="width: 100px; height: 100px" />
          </li>
          <li>
            <p>商品名称{{ result.skuName }}</p>
            <h4>7天无理由退货</h4>
          </li>
          <li>
            <h3>单价：{{ result.orderPrice }}</h3>
          </li>
          <li>数量：{{ result.skuNum }}</li>
          <li>有货</li>
        </ul>
        <ul class="list clearFix">
          <li>
            <img src="./images/goods.png" alt="" />
          </li>
          <li>
            <p>
              Apple iPhone 6s (A1700) 64G 玫瑰金色 移动联通电信4G手机硅胶透明防摔软壳
              本色系列
            </p>
            <h4>7天无理由退货</h4>
          </li>
          <li>
            <h3>￥5399.00</h3>
          </li>
          <li>X1</li>
          <li>有货</li>
        </ul>
      </div>
      <div class="bbs">
        <h5>买家留言：</h5>
        <textarea
          placeholder="建议留言前先与商家沟通确认"
          class="remarks-cont"
          v-model="message"
        ></textarea>
      </div>
      <div class="line"></div>
      <div class="bill">
        <h5>发票信息：</h5>
        <div>普通发票（电子） 个人 明细</div>
        <h5>使用优惠/抵用</h5>
      </div>
    </div>
    <div class="money clearFix">
      <ul>
        <li>
          <b
            ><i>{{ order.totalNum }}</i
            >件商品，总商品金额</b
          >
          <span>{{ order.totalAmount }}</span>
        </li>
        <li>
          <b>返现：</b>
          <span>0.00</span>
        </li>
        <li>
          <b>运费：</b>
          <span>0.00</span>
        </li>
      </ul>
    </div>
    <div class="trade">
      <div class="price">
        应付金额: <span>{{ order.originalTotalAmount }}</span>
      </div>
      <div class="receiveInfo">
        寄送至:
        <span>{{ userAddressInfo.fullAddress }}</span>
        收货人：<span>{{ userAddressInfo.consignee }}</span>
        <span>{{ userAddressInfo.phoneNum }}</span>
      </div>
    </div>
    <div class="sub clearFix">
      <a class="subBtn" @click="goPay">提交订单</a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Trade",
  data() {
    return {
      message: "",
      isApply: "appleOne",
    };
  },
  mounted() {
    // 获取用户订单信息
    this.$store.dispatch("getOrderList");
    // 获取用户地址信息
    this.$store.dispatch("getAddressList");
  },
  methods: {
    // 排它操作
    checkedAddress(item, address) {
      address.forEach((noSelect) => {
        noSelect.isDefault = 0;
      });
      item.isDefault = 1;
    },
    // 通过isApple属性控制高亮
    isOnline(str) {
      if (str !== this.isApply) {
        this.isApply = str;
      }
    },
    //提交订单
    async goPay() {
      // 获取订单号
      let tradeNo = this.order.tradeNo;
      console.log("交易编号", tradeNo);

      let data = {
        consignee: this.userAddressInfo.consignee, //最终收件人的名字
        consigneeTel: this.userAddressInfo.phoneNum, //电话号码
        deliveryAddress: this.userAddressInfo.fullAddress, //地址
        paymentWay: "ONLINE", //支付方式
        orderComment: this.message, //留言信息
        orderDetailList: this.order.detailArrayList, //购物车商品列表
      };
      //提交订单
      try {
        await this.$store.dispatch("submitInfo", { tradeNo, data });
        console.log("支付编号", this.payId);
        //将来提交订单成功【订单ID生成】，路由跳转pay页面，进行支付
        this.$router.push({ path: "/pay", query: { orderId: this.payId } });
        console.log(result);
      } catch (error) {
        alert(error.message);
      }
    },
  },
  computed: {
    ...mapGetters(["address", "order", "payId"]),
    // 返回用户当前选中的地址信息
    userAddressInfo() {
      //find:数组的方法,找到复合条件的元素.回调需要返回布尔值【真|假】，真即为查找结果【如果多个结果都为真，取其中一个】
      return this.address.find((item) => item.isDefault == 1) || {};
    },
  },
};
</script>

<style lang="less" scoped>
.trade-container {
  .title {
    width: 1200px;
    margin: 0 auto;
    font-size: 14px;
    line-height: 21px;
  }

  .content {
    width: 1200px;
    margin: 10px auto 0;
    border: 1px solid rgb(221, 221, 221);
    padding: 25px;
    box-sizing: border-box;

    .receive,
    .pay {
      line-height: 36px;
      margin: 18px 0;
    }

    .address {
      padding-left: 20px;
      margin-bottom: 15px;

      .username {
        float: left;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #ddd;
        position: relative;
      }

      .username::after {
        content: "";
        display: none;
        width: 13px;
        height: 13px;
        position: absolute;
        right: 0;
        bottom: 0;
        background: url(./images/choosed.png) no-repeat;
      }

      .username.selected {
        border-color: #e1251b;
      }

      .username.selected::after {
        display: block;
      }

      p {
        width: 610px;
        float: left;
        line-height: 30px;
        margin-left: 10px;
        padding-left: 5px;
        cursor: pointer;

        .s1 {
          float: left;
        }

        .s2 {
          float: left;
          margin: 0 5px;
        }

        .s3 {
          float: left;
          width: 56px;
          height: 24px;
          line-height: 24px;
          margin-left: 10px;
          background-color: #878787;
          color: #fff;
          margin-top: 3px;
          text-align: center;
        }
      }

      p:hover {
        background-color: #ddd;
      }
    }

    .line {
      height: 1px;
      background-color: #ddd;
    }

    .way {
      width: 1080px;
      height: 110px;
      background: #f4f4f4;
      padding: 15px;
      margin: 0 auto;

      h5 {
        line-height: 50px;
      }

      .info {
        margin-top: 20px;

        .s1 {
          float: left;
          border: 1px solid #ddd;
          width: 120px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          margin-right: 10px;
        }

        p {
          line-height: 30px;
        }
      }
    }

    .detail {
      width: 1080px;

      background: #feedef;
      padding: 15px;
      margin: 2px auto 0;

      h5 {
        line-height: 50px;
      }

      .list {
        display: flex;
        justify-content: space-between;

        li {
          line-height: 30px;

          p {
            margin-bottom: 20px;
          }

          h4 {
            color: #c81623;
            font-weight: 400;
          }

          h3 {
            color: #e12228;
          }
        }
      }
    }

    .bbs {
      margin-bottom: 15px;

      h5 {
        line-height: 50px;
      }

      textarea {
        width: 100%;
        border-color: #e4e2e2;
        line-height: 1.8;
        outline: none;
        resize: none;
      }
    }

    .bill {
      h5 {
        line-height: 50px;
      }

      div {
        padding-left: 15px;
      }
    }
  }

  .money {
    width: 1200px;
    margin: 20px auto;

    ul {
      width: 220px;
      float: right;

      li {
        line-height: 30px;
        display: flex;
        justify-content: space-between;

        i {
          color: red;
        }
      }
    }
  }

  .trade {
    box-sizing: border-box;
    width: 1200px;
    padding: 10px;
    margin: 10px auto;
    text-align: right;
    background-color: #f4f4f4;
    border: 1px solid #ddd;

    div {
      line-height: 30px;
    }

    .price span {
      color: #e12228;
      font-weight: 700;
      font-size: 14px;
    }

    .receiveInfo {
      color: #999;
    }
  }

  .sub {
    width: 1200px;
    margin: 0 auto 10px;

    .subBtn {
      float: right;
      width: 164px;
      height: 56px;
      font: 700 18px "微软雅黑";
      line-height: 56px;
      text-align: center;
      color: #fff;
      background-color: #e1251b;
    }
  }
}
</style>
