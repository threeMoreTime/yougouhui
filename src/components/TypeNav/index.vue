<template>
    <div class="type-nav">
        <!-- <h1>{{categoryList}}</h1> -->
        <!-- <img src="../../store/home"> -->
        <div class="container">
            <div @mouseleave="leaveshow" @mouseenter="showtrue">
                <h2 class="all">全部商品分类</h2>
                <transition name="jxy">
                    <div class="sort" v-show="show">
                        <div class="all-sort-list2" @click="goSearch">
                            <div :class="{ downbg: mouseindex == index }" class="item" v-for="(c1, index) in categoryList"
                                :key="c1.categoryId">
                                <h3 @mouseenter="getListindex(index)">
                                    <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">
                                        {{ c1.categoryName }}</a>
                                </h3>
                                <!-- 二级分类 -->
                                <div class="item-list" :style="{ display: mouseindex == index ? 'block' : 'none' }">
                                    <div class="subitem" v-for="(c2, index) in c1.categoryChild" :key="c2.categoryId">
                                        <dl class="fore">
                                            <dt>
                                                <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">
                                                    {{ c2.categoryName }}
                                                </a>
                                            </dt>

                                            <dd>
                                                <!-- 三级分类 -->
                                                <em v-for="(c3, index) in c2.categoryChild" :key="c3.categoryId">
                                                    <a :data-categoryName="c3.categoryName"
                                                        :data-category3Id="c3.categoryId">
                                                        {{ c3.categoryName }}
                                                    </a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
// 按需引入
import throttle from "lodash/throttle";
export default {
    name: "TypeNav",
    data() {
        return {
            mouseindex: -1,
            show: true,
        };
    },
    methods: {
        // 节流写法
        getListindex: throttle(function (index) {
            this.mouseindex = index;
            // console.log('触发节流了');
        }, 100),
        leaveshow() {
            // 鼠标移出恢复
            this.mouseindex = -1;
            if (this.$route.path != "/home") {
                //   控制数据分类信息是否显示
                this.show = false;
            }
        },
        // 委派点击事件跳转搜索页面
        goSearch(event) {
            //第一个问题:把子节点当中a标签，我加上自定义属性data-categoryName，其余的子节点是没有的
            let element = event.target;
            //获取到当前出发这个事件的节点[h3、a、dt、d1]，需要带有data-categoryname这样节点[一定是a标签]
            //节点有一个属性dataset属性，可以获取节点的自定义属性与属性值
            let { categoryname, category1id, category2id, category3id } =
                element.dataset;
            //如果标签身上拥有categoryname一定是a标签
            if (categoryname) {
                //整理路由跳转的参数
                let location = { name: "search" };
                let query = { categoryName: categoryname };
                if (category1id) {
                    query.category1id = category1id;
                } else if (category2id) {
                    query.category2Id = category2id;
                } else if (category3id) {
                    query.category3Id = category3id;
                }
                const params = { ...location, query };
                this.$router.push(params);
            }
        },
        // 鼠标移入的时候，全部商品显示
        showtrue() {
            this.show = true;
        },
    },
    mounted() {
        if (this.$route.path != "/home") {
            this.show = false;
        }
    },
    computed: {
        ...mapState({
            categoryList: (state) => state.home.categoryList,//将 Vuex store 中的 categoryList 数据映射到组件的计算属性中
        }),
    },
};
// 'home',
</script>

<style lang="less" scoped>
.type-nav {


    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    // &:hover {
                    //     .item-list {
                    //         display: block;
                    //     }
                    // }
                }
            }
        }

        // 过度动画的样式
        .jxy-enter {
            height: 0px;
        }

        .jxy-enter-to {
            height: 461px;
        }

        .jxy-enter-active {
            transition: all .6s linear;
        }

        .downbg {
            background: rgb(44, 202, 255);
        }
    }
}
</style>
