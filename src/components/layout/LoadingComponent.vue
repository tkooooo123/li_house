<template>

        <Loading :active="isLoading">
            <div class="loadingio-spinner-ripple-wu44vrvts1">
          <div class="ldio-2gn8nvj94zp">
            <div></div>
            <div></div>
          </div>
        </div>
        </Loading>



</template>

<script>
    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/css/index.css';


    export default {
    
        components: {
            Loading
        },
        data() {
          return {
            active: ''
          }
        },
       props: ['isLoading']
    }
</script>

<style lang="scss" scoped>
@keyframes ldio-2gn8nvj94zp {
  0% {
    top: 96px;
    left: 96px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 18px;
    left: 18px;
    width: 156px;
    height: 156px;
    opacity: 0;
  }
}
.ldio-2gn8nvj94zp div {
  position: absolute;
  border-width: 4px;
  border-style: solid;
  opacity: 1;
  border-radius: 50%;
  animation: ldio-2gn8nvj94zp 1s cubic-bezier(0,0.2,0.8,1) infinite;
}
.ldio-2gn8nvj94zp div:nth-child(1) {
  border-color: #1d3f72
}
.ldio-2gn8nvj94zp div:nth-child(2) {
  border-color: #5699d2;
  animation-delay: -0.5s;
}
.loadingio-spinner-ripple-wu44vrvts1 {
  width: 200px;
  height: 200px;
  display: inline-block;
  overflow: hidden;
/*  background 設定 none  */
  background: none;
}
.ldio-2gn8nvj94zp {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}
.ldio-2gn8nvj94zp div { box-sizing: content-box; }
/* generated by https://loading.io/ */

</style>