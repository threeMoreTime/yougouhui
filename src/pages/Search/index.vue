<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 面包屑数据 -->
            <!-- 商品名称 -->
            <li v-if="params.categoryName" class="with-x">
              {{ params.categoryName }}
              <i @click="RemoveCategoryName">x</i>
            </li>
            <!-- 关键字名称 -->
            <li v-if="params.keyword" class="with-x">
              {{ params.keyword }}
              <i @click="Removekeyword">x</i>
            </li>
            <!-- 图片信息名称 -->
            <li v-if="params.trademark" class="with-x">
              {{ params.trademark.split(':')[1] }}
              <i @click="Removetrademark">x</i>
            </li>
            <!-- 商品售卖信息 -->
            <li v-for="(attrValue, index) in params.props" :key="index" class="with-x">
              <span v-if="attrValue">{{ attrValue.split(":")[1] }}</span>
              <i @click="RemoveattrValue">x</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @arrtInfo="arrtInfo" @gettrademark="gettrademark" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: RankOne }" @click="changeOrder('1')">
                  <a>综合<span class="iconfont" :class="{ 'icon-jiangxu': RankDesc, 'icon-shengxu1': RankAsc }"
                      v-show="RankOne"></span></a>
                </li>
                <li :class="{ active: RankTwo }" @click="changeOrder('2')">
                  <a>价格<span class="iconfont" :class="{ 'icon-jiangxu': RankDesc, 'icon-shengxu1': RankAsc }"
                      v-show="RankTwo"></span></a>
                </li>

              </ul>
            </div>
          </div>
          <!-- 商品列表数据 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" target="_blank" v-for="goods in result.goodsList" :key="goods.id">
                <div class="list-wrap">
                  <!-- 图片数据 -->
                  <div class="p-img">
                    <a href="item.html"><img :src="goods.defaultImg" /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>&nbsp;¥&nbsp;</em>
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html">{{ goods.title }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <!-- 四个参数 pageNo（当前页号）,pagesize（一页的数据多少条）
          ,toal(一共多少条数据) continues(连续页码)-->
          <Pagination :continues="5" :pageSize="5" :pageNo="7" :toTal="500" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector/SearchSelector'
import { reqgoodslist } from "@/api";
// import { mapGetters } from 'vuex';
export default {
  name: 'Search',
  data() {
    return {
      result: [],
      params: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        order: "1:desc",
        pageNo: 1,
        pageSize: 10,
        props: [],
        trademark: ""

      },
    }
  },
  components: {
    SearchSelector
  },
  beforeMount() {
    //合并参数发送请求
    Object.assign(this.params, this.$route.query, this.$route.params)
  },
  mounted() {
    this.getlist();
  },
  methods: {

    // 发请求
    getlist() {
      reqgoodslist(this.params).then((res) => {
        this.result = res.data;
        // 派发cation给仓库
        // this.$store.dispatch('getsearchlist', {})
      })
    },
    // 删除面包屑商品数据
    RemoveCategoryName() {
      this.params.categoryName = undefined;
      this.categoryName = undefined;
      this.category1Id = undefined;
      this.category2Id = undefined;
      this.category3Id = undefined;
      this.getlist();
      if (this.$route.params) {
        this.$router.push({ name: 'search', params: this.$route.params })
      }
    },
    // 删除搜索栏关键字
    Removekeyword() {
      this.params.keyword = undefined;
      this.getlist();
      // 通知兄弟组件header清除搜索栏中的文字
      this.$bus.$emit("clear");
      if (this.$route.query) {
        this.$router.push({ name: 'search', query: this.$route.query })
      }
    },
    // 自定义数据 获取品牌信息
    gettrademark(trademark) {
      // 绑定trademark参数
      this.params.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.getlist()
    },
    //清除trademark参数重新发请求
    Removetrademark() {
      this.params.trademark = undefined;
      this.getlist();
    },
    // 自定义事件获取平台售卖信息
    arrtInfo(attrs, attrValue) {
      let arr = `${attrs.attrId}:${attrValue}:${attrs.attrName}`;
      this.params.props.splice(0, this.params.props.length, arr);

      if (this.params.props.includes(arr)) {
        this.getlist();
      } else {
        this.params.props.push(arr);
        this.getlist();
      }
    },
    // 删除attrValue数据面包屑
    RemoveattrValue() {
      // this.params.props[0] = '';
      this.params.props.splice(0, this.params.props.length);
      this.getlist();
    },
    changeOrder(number) {
      // 给Rankname第一个参数，表示是什么排序 综合还是价格排序 split根据:来切割数据
      let Rankname = this.params.order.split(':')[0];
      // 给Rankname第二个参数，表示是降序还是升序排序 split根据:来切割数据
      let RankType = this.params.order.split(':')[1];
      // 创建一个中间值
      let arr = '';
      // 如果传参等于number 则修改排序方式（升序，降序） 不然修改排序名称（综合，价格）
      if (number == Rankname) {
        arr = `${Rankname}:${RankType == 'desc' ? 'asc' : 'desc'}`

      } else {
        arr = `${number}:${'desc'}`
      }
      this.params.order = arr;
      this.getlist();


    }
  },
  watch: {
    // 监听路由信息，有变化则重新发送请求并改变请求参数
    $route(newValue, oldValue) {
      Object.assign(this.params, this.$route.query, this.$route.params)
      this.getlist();
      // 重置分类id 接收下次新的分类id
      this.category1Id = undefined;
      this.category2Id = undefined;
      this.category3Id = undefined;
    }
  },
  computed: {
    RankOne() {
      return this.params.order.indexOf('1') != -1;
    },
    RankTwo() {
      return this.params.order.indexOf('2') != -1;
    },
    RankAsc() {
      return this.params.order.indexOf('asc') != -1
    },
    RankDesc() {
      return this.params.order.indexOf('desc') != -1
    }
  },
  // watch: {
  //   //监听bannerList的数据变化 从空数组变成四个数据
  //   goodsList: {
  //     handler(newValue, oldValue) {
  //       //nextTick在v-for循环完后再渲染数据上去
  //       this.$nextTick(() => {
  //         console.log('goodsList', this.goodsList);
  //       })

  //     }

  //   }

  // },
  // computed: {
  //   // 获取search仓库的goodsList中数据
  //   ...mapGetters(['goodsList'])
  // }


}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>