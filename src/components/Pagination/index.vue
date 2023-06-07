<template>
    <!-- 分页 -->
    <div class="pagination">

        <button>上一页</button>
        <button>1</button>
        <button>2</button>

        <button>3</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>7</button>

        <button>8</button>
        <button>9</button>
        <!-- 总页数  -->
        <button>{{ totalPages }}</button>
        <button>上一页</button>
        <!-- 总页数 -->
        <button style="margin-left: 30px">{{ continues }}</button>
        <h1>{{ SandEpages.start }} - {{ SandEpages.end }}</h1>

    </div>
</template>
<script>
export default {
    name: "Pagination",
    // 四个参数 pageNo（当前页号）,pageSize（一页的数据多少条），toTal（一共多少条数据），continues（连续页码为5）
    props: ['continues', 'pageSize', 'pageNo', 'total'],
    computed: {
        // 计算总页数 向上取整
        totalPages() {
            return Math.ceil(this.total / this.pageSize);
        },
        // 计算前后页数 
        SandEpages() {
            // 解构赋值，不需要写this
            const { continues, pageNo, totalPages } = this;
            // 起始状态
            let start = 0, end = 0;

            // 如果连续页码大于当前总页数
            if (continues > totalPages) {
                start = 1;
                end = totalPages;
            } else {
                // 正常情况下，总页码大于连续页码
                start = pageNo - parseInt(continues / 2);
                end = pageNo + parseInt(continues / 2);
            }

            return { start, end };
        }
    }
}
</script>

<style lang="less" scoped>
.pagination {
    text-align: center;

    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #409eff;
            color: #fff;
        }
    }
}
</style>