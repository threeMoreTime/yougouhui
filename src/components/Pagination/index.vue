<template>
    <!-- 分页 -->
    <div class="pagination">
        <button :disabled="pageNo == 1" @click="$emit('getpageinfo', pageNo - 1)">上一页</button>
        <!-- 当起始页码大于1时 -->
        <button v-show="SandEpages.start > 1" @click="$emit('getpageinfo', pageNo = 1)">1</button>
        <!-- 当起始页码大于2时 -->
        <button v-show="SandEpages.start > 2">...</button>
        <button v-for="(item, index) in SandEpages.end" :key="index" v-show="item >= SandEpages.start"
            @click="$emit('getpageinfo', pageNo = item)">{{ item }}</button>
        <!-- 当结束页码小于总页码减一时 -->
        <button v-show="SandEpages.end < totalPages - 1">...</button>
        <!-- 当结束页码小于总页码时 -->
        <button v-show="SandEpages.end < totalPages" @click="$emit('getpageinfo', totalPages)">{{ totalPages }}</button>
        <button :disabled="pageNo == SandEpages.end" @click="$emit('getpageinfo', pageNo + 1)">下一页</button>
        <!-- 总页数 -->
        <button @click="$emit('getpageinfo', totalPages)" style="margin-left: 30px">{{ totalPages }}</button>
        <h1>{{ SandEpages.start }} - {{ SandEpages.end }}</h1>
    </div>
</template>
<script>
export default {
    name: "Pagination",
    // 四个参数 pageNo（当前页号）,pageSize（一页的数据多少条），
    // toTal（一共多少条数据），continues（连续页码为5）
    props: {
        continues: {
            type: Number,
            required: true
        },
        pageSize: {
            type: Number,
            required: true
        },
        pageNo: {
            type: Number,
            required: true
        },
        toTal: {
            type: Number,
            required: true
        }
    },
    computed: {
        // 计算总页数 向上取整
        totalPages() {
            return Math.ceil(this.toTal / this.pageSize);
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
                // 开始页码等于当前页码减去连续页码除二向下取整
                // 结束页码等于当前页码加上连续页码除二向下取整
                start = pageNo - parseInt(continues / 2);
                end = pageNo + parseInt(continues / 2);
                // 如果开始页码小于1,结束页码等于连续页码
                if (start < 1) {
                    start = 1;
                    end = continues;
                }
                if (end > totalPages) {
                    start = start = pageNo - parseInt(continues / 2);
                    end = totalPages;
                }
            }

            return { start, end };
        }
    },
    methods: {

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