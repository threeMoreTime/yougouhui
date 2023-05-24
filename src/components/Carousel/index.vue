<template>
    <div>
        <div class="swiper-container" id="floor1Swiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="item in list" :key="item.id">
                    <!-- carouselList中的数据 -->
                    <img :src="item.imgUrl">
                </div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>

            <!-- 如果需要导航按钮 -->
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
        </div>
    </div>
</template>
<script>
import Swiper from 'swiper';
import 'swiper/css/swiper.css'
export default {
    name:"Carousel",
    props:['list'],
    mounted() {
        var mySwiper = new Swiper('.swiper-container', {
            direction: 'horizontal', // 垂直切换选项
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
            },

            // 如果需要前进后退按钮
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        })

    },
}
</script>

<style></style>