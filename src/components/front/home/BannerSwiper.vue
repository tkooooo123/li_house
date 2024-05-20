<template>
    <swiper :spaceBetween="30" :centeredSlides="true" :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
    }" :pagination="{
        clickable: true,
    }" :navigation="true" :modules="modules" class="mySwiper">

        <swiper-slide>
            <img src="https://cdn.hk01.com/di/media/images/dw/20220503/598221776203288576687042.jpeg/4-Da4DZToAxwkdfgnO9OG9P23Cdm5ealbUkTsG1JE7A?v=w1920r16_9" alt="banner1" />
        </swiper-slide>
        <swiper-slide>
            <img src="/images/banner2.jpg" alt="banner2">
        </swiper-slide>
        <swiper-slide>
            <img src="/images/banner3.jpg" alt="banner3" />
        </swiper-slide>
    </swiper>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        return {
            modules: [Autoplay, Pagination, Navigation],
        };
    },
};
</script>

<style lang="scss" scoped>
.swiper-slide {
    img {
        max-height: 35rem;
    width: 100%;
    object-fit: cover;
    }
}
</style>