<template>
    <swiper :spaceBetween="30" :centeredSlides="true" :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
    }" :pagination="{
        clickable: true,
    }" :navigation="true" :modules="modules" class="mySwiper">

        <swiper-slide>
            <img src="https://i.imgur.com/ob4OpWN.jpeg" alt="banner1" />
            <div class="banner-text">
                <h2 class="banner-text-title fw-bold text-white">開幕歡慶</h2>
                <p class="banner-text-content text-white fw-bold mt-2">全站商品免運費</p>
            </div>
            <RouterLink to="/products" class="banner-link btn btn-primary rounded-pill py-2 px-4 fs-2">
                前往選購
            </RouterLink>
        </swiper-slide>
        <swiper-slide>

            <img src="/images/banner2.jpg" alt="banner2">
            <div class="banner-text">
                <h2 class="banner-text-title fw-bold text-white">寵愛一生</h2>
                <p class="banner-text-content text-white fw-bold mt-2">體驗幸福心生活</p>
            </div>
            <RouterLink to="/products" class="banner-link btn btn-primary rounded-pill py-2 px-4 fs-2">
               前往選購
            </RouterLink>
        </swiper-slide>
        <swiper-slide>

            <img src="/images/banner3.jpg" alt="banner3" />
            <div class="banner-text">
                <h2 class="banner-text-title fw-bold text-white">新品上市</h2>
                <p class="banner-text-content text-white fw-bold mt-2">嚴選優質好物</p>
            </div>
            <RouterLink to="/products" class="banner-link btn btn-primary rounded-pill py-2 px-4 fs-2">
                前往選購
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
        position: relative;
    }
}
.banner-text {
    position: absolute;
    top: 20%;
    left: 10%;
    
    z-index: 2;
    &-title {
        font-size: 40px;
    }
    &-content {
        font-size: 32px;
    }
    &::before {
        position:absolute;
        content: '';
        height: 8rem;
        width: 16rem;
        transform: translate(-5%, -5%);
        background-color: black;
        border-radius: 16px;
        opacity: 0.2;
        z-index: -1;

    }
}
.banner-link {
    position: absolute;
    top: 75%;
    left: 50%;
    transform: translate(-50%, -50%);
    &:hover {
        color: white;
    }
}
</style>