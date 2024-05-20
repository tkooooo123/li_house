<template>
    <swiper :spaceBetween="30" :centeredSlides="false" :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
    }"
      :slides-per-view="1"
      :breakpoints="{
        576: {
            slidesPerView:2
        },
        992: {
            slidesPerView:3
        },
        1440: {
            slidesPerView:4
        }
      }"
     :navigation="true" :modules="modules" :autoHeight="false" class="mySwiper">
     
        <swiper-slide v-for="product in products" :key="product.id">
            <ProductCard 
            :product="product"
            />
        </swiper-slide>

    </swiper>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import ProductCard from './ProductCard.vue';


export default {
    props: ['products'],
    components: {
        Swiper,
        SwiperSlide,
        ProductCard
    },
    setup() {
        return {
            modules: [Autoplay, Pagination, Navigation],
        };
    },
    
    

};
</script>
<style lang="scss" scoped>
.swiper-slide{
    height: auto;
   
}


</style>