<template>
  <RouterView />
</template>

<script>

import AOS from 'aos'
import 'aos/dist/aos.css'

export default {
  mounted() {
    AOS.init({
      duration: 500
    })
  }
}
</script>

<style lang="scss">
@import './assets/all.scss';
</style>