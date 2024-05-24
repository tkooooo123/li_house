<template>
    <swiper :spaceBetween="30" :centeredSlides="true" :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
    }" :pagination="{
        clickable: true,
    }" :navigation="true" :modules="modules" class="mySwiper">

        <swiper-slide>
            <RouterLink to="/products">
                <img src="https://i.imgur.com/ob4OpWN.jpeg"
                alt="banner1" />
            </RouterLink>
        </swiper-slide>
        <swiper-slide>
            <RouterLink to="/products">
                <img src="/images/banner2.jpg" alt="banner2">
            </RouterLink>
        </swiper-slide>
        <swiper-slide>
            <RouterLink to="/products">
                <img src="/images/banner3.jpg" alt="banner3" />
            </RouterLink>
            
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
       aspect-ratio: 1;
    }
}
</style>