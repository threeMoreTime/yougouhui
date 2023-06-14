<template>
  <div class="spec-preview">
    <!-- 原图片 -->
    <img :src="objimg.imgUrl" />
    <div class="event" @mousemove="magnifier"></div>
    <div class="big">
      <!-- 放大后的照片 -->
      <img :src="objimg.imgUrl" ref="big" />
    </div>
    <!-- 遮罩层 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ["skuImageList"],
  data() {
    return {
      indexValue: 0,
    };
  },
  mounted() {
    // 接收兄弟组件参数 修改大的轮播图
    this.$bus.$on("getindex", (index) => {
      this.indexValue = index;
    });
  },
  computed: {
    objimg() {
      return this.skuImageList[this.indexValue] || {};
    },
  },
  methods: {
    // magnifier(event) {
    //   const { mask, big } = this.$refs;
    //   let X = event.offsetX - mask.offsetWidth / 2;
    //   let Y = event.offsetY - mask.offsetHeight / 2;
    //   // console.log(X, Y);
    //   if (X < 0) {
    //     X = 0;
    //   } else if (X > mask.offsetHeight) {
    //     X = mask.offsetWidth;
    //   }
    //   if (Y < 0) {
    //     Y = 0;
    //   } else if (Y > mask.offsetHeight) {
    //     Y = mask.offsetHeight;
    //   }
    //   big.style.left = -2 * X + "PX";
    //   big.style.top = -2 * Y + "PX";
    //   mask.style.left = X + "px";
    //   mask.style.top = Y + "px";
    // },
    // 优化后代码
    magnifier(event) {
      // 获取遮罩层和放大后图片的对象
      const { big, mask } = this.$refs;

      // 计算遮罩层的左右和上下，大图片的长宽减去遮罩层一半的长宽
      let Left = event.offsetX - mask.offsetWidth / 2;
      let Top = event.offsetY - mask.offsetHeight / 2;

      // 限制范围
      Left = Left < 0 ? 0 : Left > mask.offsetWidth ? mask.offsetWidth : Left;
      Top = Top < 0 ? 0 : Top > mask.offsetHeight ? mask.offsetHeight : Top;

      // 设置遮罩层的位置
      mask.style.left = `${Left}px`;
      mask.style.top = `${Top}px`;

      // 设置放大后图片的位置
      big.style.left = `${-2 * Left}px`;
      big.style.top = `${-2 * Top}px`;
    },
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
