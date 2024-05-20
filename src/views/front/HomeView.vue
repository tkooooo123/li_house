<script setup>

</script>

<template>
  <main class="pt-mh">

    <div class="">
      <BannerSwiper />
      <HomeCategory />
      <HomeLatest />
      <div class="container pt-5">
        <div class="subtitle d-flex align-items-center justify-content-center">
          <h3 class="fw-bold text-white"></h3>
        </div>
      </div>
      <HomeActivity />
      <HomeSubscribe />
     

    </div>

  </main>
</template>
<script>
import { mapActions, mapState } from 'pinia'
import productsStore from '@/stores/productsStore'
import BannerSwiper from '@/components/front/home/BannerSwiper.vue'
import HomeCategory from '@/components/front/home/HomeCategory.vue'
import HomeLatest from '@/components/front/home/HomeLatest.vue'
import HomeActivity from '@/components/front/home/HomeActivity.vue'
import HomeSubscribe from '@/components/front/home/HomeSubscribe.vue'

export default {
  components: {
    BannerSwiper,
    HomeCategory,
    HomeLatest,
    HomeActivity,
    HomeSubscribe,
  },
  created() {
    this.fetchProducts()
  },
  methods: {
    ...mapActions(productsStore, [
      'fetchProducts',
    ])
  },
  computed: {
    ...mapState(productsStore, [
      'categoryList',
      'productsAll'
    ])
  }
}
</script>
<style lang="scss" scoped>
.subtitle {
  background-image: url('https://i.imgur.com/x9D9zmz.jpeg'), ;
  padding: 5rem 0;
  background-attachment: fixed;
  background-position: center top;
  background-size: cover;
  border-radius: 16px;
}

</style>