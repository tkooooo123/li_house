<script setup>

</script>

<template>
  <main class="">

    <div class="pt-5">
      <BannerSwiper />
      <HomeCategory />
    </div>

  </main>
</template>
<script>
import BannerSwiper from '@/components/front/home/BannerSwiper.vue'
import HomeCategory from '@/components/front/home/HomeCategory.vue'
import { mapActions, mapState } from 'pinia'
import productsStore from '@/stores/productsStore'


export default {
  components: {
    BannerSwiper,
    HomeCategory,
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
      'categoryList'
    ])
  }
}
</script>
<style lang="scss" scoped>
@import 'bootstrap/scss/functions';
@import '@/assets/helpers/variables';

.mt {
  padding-top: 72px;
}
</style>